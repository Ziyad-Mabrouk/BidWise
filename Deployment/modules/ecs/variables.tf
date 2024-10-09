variable "main_image" {
  type = string
}
variable "app_port" {
  default     = 80
}
variable "fargate_cpu" {
  description = "1 vCPU = 1024"
  default     = "256"
}
variable "fargate_memory" {
  description = "in Mb"
  default     = "512"
}
variable "cloudwatch_log_group" {
    type = string
}
variable "region" {
    type = string
}
variable "security_groups"{
    type = list
}
variable "subnets"{
    type = list
    
}
variable "target_group_arn"{
    type = string
}