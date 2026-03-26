from rest_framework.pagination import PageNumberPagination

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "pageSize"
    page_query_param = "page"
    max_page_size = 100

    def get_paginated_data(self):
        return {
            "totalCount": self.page.paginator.count,
            "pageSize": self.get_page_size(self.request),
            "pageCount": self.page.paginator.num_pages,
            "page": self.page.number,
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
        }