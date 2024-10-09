resource "aws_alb" "main-alb"{
    name            = "main-alb"
    subnets         = var.subnets
    security_groups = var.security_groups
    tags = {
        Name        = "Main Load Balancer"
    }
}

resource "aws_alb_target_group" "alb-tg"{
    name        = "alb-tg"
    port        = var.app_port
    protocol    = "HTTP"
    vpc_id      = var.vpc_id
    target_type = "ip"

    health_check {
        healthy_threshold   = "3"
        interval            = "30"
        protocol            = "HTTP"
        matcher             = "200"
        timeout             = "3"
        path                = var.health_check_path
        unhealthy_threshold = "2"
    }
        tags = {
        Name        = "ALB Target Group"
    }

}

resource "aws_alb_listener" "front_end" {
    load_balancer_arn   = aws_alb.main-alb.id
    port                = var.app_port
    protocol            = "HTTP"

    default_action {
        target_group_arn = aws_alb_target_group.alb-tg.arn
        type             = "forward"
    }
        tags = {
        Name        = "ALB Listener"
    }
}