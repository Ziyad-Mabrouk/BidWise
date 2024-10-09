output "allow_web_security_group_id" {
    value   = aws_security_group.allow_web.id
}
output "main_vpc_id" {
    value   = aws_vpc.main.id
}
output "subnets"{
    value   = [aws_subnet.subnet-pub-1.id,aws_subnet.subnet-pub-2.id]
}
output "prv-subnets"{
    value   = [aws_subnet.subnet-prv-1.id,aws_subnet.subnet-prv-2.id]
}