import useImportBooks from "./util/useImportBooks";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
export default function BooksLoader({loadQty=30}) {
  const { loading, error } = useImportBooks({ loadQty });
  if (loading) return <div style={{textAlign: 'center', marginTop: '50vh'}}>Loading...</div>;
  if (error) {
    const msg = typeof error === 'string' ? error : error?.message || 'Unknown error';
    return <div style={{textAlign: 'center', marginTop: '50vh'}}> Error...</div>;
  }
  return null;
}