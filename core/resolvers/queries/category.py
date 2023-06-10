from ariadne import convert_kwargs_to_snake_case

from core import db
from core.extras import create_result, token_required
from core.extras.utils.resolver_utils import query_sort, query_pagination
from core.models import Category


@token_required()
@convert_kwargs_to_snake_case
def resolve_get_categories(_obj, _info, **kwargs):
    query = db.session.query(Category)
    query = query_sort(query=query, resolver_args=kwargs)
    query = query_pagination(query=query, resolver_args=kwargs)
    categories = query.all()

    return create_result(categories=categories)
