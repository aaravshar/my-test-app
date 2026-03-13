```python
import boto3
from botocore.exceptions import ClientError

def get_dynamodb_client():
    return boto3.resource('dynamodb', region_name='us-west-2')  # Change region as needed

def get_item_from_dynamodb(table_name, key):
    try:
        table = get_dynamodb_client().Table(table_name)
        response = table.get_item(Key=key)
        return response.get('Item')
    except ClientError as e:
        print(f"Error fetching item: {e}")
        return None
```
