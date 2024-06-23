export const handleScroll = (pagination, setPagination, loading) => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    !loading &&
    pagination.page + 1 <= pagination.totalPages
  ) {
    setPagination((old) => {
      return { ...old, page: pagination.page + 1 };
    });
  }
};
