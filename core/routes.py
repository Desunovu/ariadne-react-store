import json

from ariadne import graphql_sync, combine_multipart_data
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify, current_app

from core import graphql_bp
from core.schema import schema


@graphql_bp.route("/graphql", methods=["GET"])
def graphql_playground():
    return PLAYGROUND_HTML, 200


@graphql_bp.route("/graphql", methods=["POST"])
def graphql_server():
    if request.content_type.startswith("multipart/form-data"):
        data = combine_multipart_data(
            json.loads(request.form.get("operations")),
            json.loads(request.form.get("map")),
            dict(request.files)
        )
    else:
        data = request.get_json()

    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=current_app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code
