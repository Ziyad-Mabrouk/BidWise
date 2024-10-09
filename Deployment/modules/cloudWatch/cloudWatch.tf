#cloud watch log group
resource "aws_cloudwatch_log_group" "ecs-logs" {
  name = "ecs-logs"
  tags = {
        Name        = "Log Group"
  }
}
