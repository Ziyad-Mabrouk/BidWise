#vpc
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
      Name        = "Main VPC"
  }
}

#gateway
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
  tags = {
      Name        = "Main Gateway"
  }
}

#route table
resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
  tags = {
      Name        = "Internet RouteTable"
  }
}

#public subnet 1
resource "aws_subnet" "subnet-pub-1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "${var.region}a"
  tags = {
      Name        = "Public Subnet 1"
  }
}

#public subnet 2
resource "aws_subnet" "subnet-pub-2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "${var.region}b"
  tags = {
      Name        = "Public Subnet 2"
  }
}

#private subnet 1
resource "aws_subnet" "subnet-prv-1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "${var.region}a"
  tags = {
      Name        = "Private Subnet 1"
  }
}

#private subnet 2
resource "aws_subnet" "subnet-prv-2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.4.0/24"
  availability_zone = "${var.region}b"
  tags = {
      Name        = "Private Subnet 2"
  }
}

#associate route table to the public subnet 1
resource "aws_route_table_association" "r11" {
  subnet_id      = aws_subnet.subnet-pub-1.id
  route_table_id = aws_route_table.route_table.id
}

#associate route table to the public subnet 2
resource "aws_route_table_association" "r12" {
  subnet_id      = aws_subnet.subnet-pub-2.id
  route_table_id = aws_route_table.route_table.id
}

#security groupe to allow traffic : 80 and 443
resource "aws_security_group" "allow_web" {
  name        = "allow_web"
  description = "Allow web inbound traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "https from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "http from VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
      Name        = "SG to allow http https from *"
  }
}

#allow network interface to the public subnet 1
resource "aws_network_interface" "web-interface-1" {
  subnet_id       = aws_subnet.subnet-pub-1.id
  private_ips     = ["10.0.1.50"]
  security_groups = [aws_security_group.allow_web.id]
  tags = {
      Name        = "Public Subnet 1 Interface"
  }
}

#allow network interface to the public subnet 2
resource "aws_network_interface" "web-interface-2" {
  subnet_id       = aws_subnet.subnet-pub-2.id
  private_ips     = ["10.0.3.50"]
  security_groups = [aws_security_group.allow_web.id]
  tags = {
      Name        = "Public Subnet 2 Interface"
  }
}

#give them an elastic ip 
resource "aws_eip" "elastic_ip1" {
  domain                    = "vpc"
  network_interface         = aws_network_interface.web-interface-1.id
  associate_with_private_ip = "10.0.1.50"
  depends_on = [aws_internet_gateway.gw]
  tags = {
      Name        = "Pub Subnet 1 Elastic IP"
  }
}
resource "aws_eip" "elastic_ip2" {
  domain                    = "vpc"
  network_interface         = aws_network_interface.web-interface-2.id
  associate_with_private_ip = "10.0.3.50"
  depends_on = [aws_internet_gateway.gw]  
  tags = {
      Name        = "Pub Subnet 2 Elastic IP"
  }
}

#create elastic ip to use with nat 
resource "aws_eip" "nat1" {
  domain                    = "vpc"
  tags = {
      Name        = "NAT1 Elastic IP"
  }
}
resource "aws_eip" "nat2" {
  domain                    = "vpc"
  tags = {
      Name        = "NAT2 Elastic IP"
      Environment = "dev"
  }
}

#create nat table in public subnet 1
resource "aws_nat_gateway" "nat1" {
  allocation_id = aws_eip.nat1.id
  subnet_id     = aws_subnet.subnet-pub-1.id
  tags = {
      Name        = "NAT1"
  }
}

#create nat table in public subnet 2
resource "aws_nat_gateway" "nat2" {
  allocation_id = aws_eip.nat2.id 
  subnet_id     = aws_subnet.subnet-pub-2.id
  tags = {
      Name        = "NAT2"
  }
}

#route table for private subnet 1
resource "aws_route_table" "private_route_table1" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat1.id
  }
  tags = {
      Name        = "NAT1 Internet RouteTable"
  }
}

#route table for private subnet 2
resource "aws_route_table" "private_route_table2" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat2.id
  }
  tags = {
      Name        = "NAT2 Internet RouteTable"
  }
}

#associate route table to the private subnet 1
resource "aws_route_table_association" "r21" {
  subnet_id      = aws_subnet.subnet-prv-1.id
  route_table_id = aws_route_table.private_route_table1.id
}

#associate route table to the private subnet 2
resource "aws_route_table_association" "r22" {
  subnet_id      = aws_subnet.subnet-prv-2.id
  route_table_id = aws_route_table.private_route_table2.id
}

#network interface for private subnet 1
resource "aws_network_interface" "private_interface1" {
  subnet_id       = aws_subnet.subnet-prv-1.id
  private_ips     = ["10.0.2.50"]
  security_groups = [aws_security_group.allow_web.id]
  tags = {
      Name        = "Private Subnet 1 Interface"
  }
}

#network interface for private subnet 2
resource "aws_network_interface" "private_interface2" {
  subnet_id       = aws_subnet.subnet-prv-2.id
  private_ips     = ["10.0.4.50"]
  security_groups = [aws_security_group.allow_web.id]
  tags = {
      Name        = "Private Subnet 2 Interface"
  }
}