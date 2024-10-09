module "infra"{
    source  ="./modules/infra"
    region = var.region
}
module "alb"{
    source  ="./modules/alb"
    security_groups = [module.infra.allow_web_security_group_id]
    subnets = module.infra.subnets
    vpc_id = module.infra.main_vpc_id
    health_check_path = "/"
}
module "ecs"{
    source  ="./modules/ecs"
    main_image ="docker.io/ziyadmabrouk/bidwise:latest"
    cloudwatch_log_group    = module.cloudWatch.cloudwatch_log_group_name
    region = var.region
    security_groups = [module.infra.allow_web_security_group_id]
    subnets = module.infra.prv-subnets
    target_group_arn = module.alb.alb-tg
    depends_on = [module.alb.alb_listener]
}
module "cloudfront" {
    source = "./modules/cloudfront"
    dns_name = module.alb.alb_hostname
}
module "waf"{
    source="./modules/waf"
    alb_arn=module.alb.alb_arn
}
module "cloudWatch"{
    source  ="./modules/cloudWatch"
    region = var.region
}
module "lambda"{
    source ="./modules/lambda"
    service_name = module.ecs.service_name
    cluster_name = module.ecs.cluster_name
}