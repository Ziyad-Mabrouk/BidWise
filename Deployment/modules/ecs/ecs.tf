resource "aws_ecs_cluster" "main-cluster" {
    name = "main-cluster"
    tags = {
        Name        = "Main ECS Cluster"
    }
}

data "template_file" "main-app" {
    template = file ("./modules/ecs/mainApp.json.tpl")
    vars = {
        main_image              = var.main_image
        app_port                = var.app_port
        fargate_cpu             = var.fargate_cpu
        fargate_memory          = var.fargate_memory
        region                  = var.region
        cloudwatch_log_group    = var.cloudwatch_log_group
    }
}

resource "aws_ecs_task_definition" "task" {
  family                    = "task"
  execution_role_arn        = "arn:aws:iam::600182887081:role/LabRole"
  task_role_arn             = "arn:aws:iam::600182887081:role/LabRole"
  network_mode              = "awsvpc"
  container_definitions     = data.template_file.main-app.rendered
  requires_compatibilities  = ["FARGATE"]
  cpu                       = var.fargate_cpu
  memory                    = var.fargate_memory
  tags = {
        Name        = "ECS Task"
  }
}

resource "aws_ecs_service" "service" {
    name            = "ecs-service"
    cluster         = aws_ecs_cluster.main-cluster.id
    task_definition = aws_ecs_task_definition.task.arn
    enable_execute_command = true
    desired_count   = 2
    launch_type     = "FARGATE"
    network_configuration {
        security_groups     = var.security_groups
        subnets             = var.subnets
        assign_public_ip    = false
    }
    load_balancer {
        target_group_arn = var.target_group_arn
        container_name   = "main-app"
        container_port   = var.app_port
    }
      tags = {
        Name        = "ECS Service"
  }

}