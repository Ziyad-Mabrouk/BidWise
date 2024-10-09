import json
import boto3
import os

def lambda_handler(event, context):
    ecs_client = boto3.client('ecs')
    cluster_name = os.environ['CLUSTER_NAME']
    service_name = os.environ['SERVICE_NAME']
    
    # Update the service to force a new deployment
    response = ecs_client.update_service(
        cluster=cluster_name,
        service=service_name,
        forceNewDeployment=True
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps('ECS Service Updated Successfully')
    }
