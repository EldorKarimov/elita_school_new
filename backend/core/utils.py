from rest_framework.response import Response
from rest_framework import status

def api_response(data=None, status_code=status.HTTP_200_OK, errors=None):
    response_data = {
        "success": status.is_success(status_code),
        "code": status_code,
        "data": data,
        "errors": errors
    }
    return Response(response_data, status=status_code)

def paginated_response(paginator, serializer):
    return Response({
        "success": True,
        "error": None,
        "code": status.HTTP_200_OK,
        "data": serializer.data,
        "pagination": paginator.get_paginated_data()
    })


def error_response(errors=None, status_code=400):
    return Response({
        "success": False,
        "code": status_code,
        "errors": errors
    }, status=status_code)