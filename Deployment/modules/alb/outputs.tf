output "alb_hostname" {
    value   = aws_alb.main-alb.dns_name
}
output "alb_arn" {
    value   = aws_alb.main-alb.arn
}
output "alb-tg"{
    value = aws_alb_target_group.alb-tg.arn
}
output "alb_listener"{
    value = aws_alb_listener.front_end
}
