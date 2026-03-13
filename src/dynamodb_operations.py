```python
import boto3
from botocore.exceptions import ClientError

def get_dynamodb_client():
    return boto3.resource('dynamodb', region_name='us-west-2')  # Ensure region is correct

def get_item_from_dynamodb(table_name, key):
    try:
        table = get_dynamodb_client().Table(table_name)
        response = table.get_item(Key=key)
        return response.get('Item')
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'ResourceNotFoundException':
            print(f"Resource not found: Table '{table_name}' or item with key '{key}' not found.")
        else:
            print(f"Error fetching item: {e.response['Error']['Message']}")
        return None

```
