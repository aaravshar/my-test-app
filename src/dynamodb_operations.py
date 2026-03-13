import boto3
from botocore.exceptions import ClientError

def initialize_dynamodb_client(region_name='us-west-2'):
    """
    Initializes and returns a DynamoDB client with the specified region.
    """
    return boto3.resource('dynamodb', region_name=region_name)

def get_item_from_dynamodb(table_name, key, dynamodb_client=None):
    """
    Retrieves an item from the specified DynamoDB table.
    Args:
        table_name (str): The name of the table to query.
        key (dict): The key of the item to retrieve.
        dynamodb_client: The DynamoDB client to use for the request.
    Returns:
        dict: The item from the DynamoDB table, or None if not found.
    """
    try:
        if dynamodb_client is None:
            dynamodb_client = initialize_dynamodb_client()

        table = dynamodb_client.Table(table_name)
        response = table.get_item(Key=key)

        if 'Item' in response:
            return response['Item']
        else:
            print(f"No item found for key: {key}")
            return None

    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceNotFoundException':
            print(f"Error: Requested DynamoDB table '{table_name}' not found. Check if the table exists and is in the correct region.")
        else:
            print(f"Unexpected error: {e}")
        return None

# Example usage
if __name__ == "__main__":
    table_name = "example_table"
    key = {"id": "example_id"}

    item = get_item_from_dynamodb(table_name, key)
    if item:
        print("Item retrieved:", item)
    else:
        print("Failed to retrieve item.")
