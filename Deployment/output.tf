output "dns_name" {
    value   = module.alb.alb_hostname
}
output "cloudfront_domain_name" {
  value = module.cloudfront.cloudfront_domain_name
}
output "api_endpoint_lambda_trigger" {
  value = module.lambda.api_endpoint
}