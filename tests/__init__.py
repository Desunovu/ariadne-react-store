def execute_query(client, query):
    rv = client.post("/graphql", json=query)
    result = rv.get_json()
    return result
