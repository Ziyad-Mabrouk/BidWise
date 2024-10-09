resource "aws_lambda_function" "update_ecs_service" {
  filename         = "update_ecs.zip"
  function_name    = "update_ecs"
  role             = "arn:aws:iam::600182887081:role/LabRole"
  handler          = "index.lambda_handler"
  runtime          = "python3.8"
  source_code_hash = filebase64sha256("update_ecs.zip")

  environment {
    variables = {
      CLUSTER_NAME = var.cluster_name
      SERVICE_NAME = var.service_name
    }
  }
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.update_ecs_service.function_name
  principal     = "apigateway.amazonaws.com"
}

resource "aws_apigatewayv2_api" "lambda_api" {
  name          = "ecsUpdateApi"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id           = aws_apigatewayv2_api.lambda_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.update_ecs_service.arn
}

resource "aws_apigatewayv2_route" "lambda_route" {
  api_id    = aws_apigatewayv2_api.lambda_api.id
  route_key = "POST /update"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "lambda_stage" {
  api_id      = aws_apigatewayv2_api.lambda_api.id
  name        = "$default"
  auto_deploy = true
}
