import useImportBooks from "../util/useImportBooks";
export default function BooksLoader({loadQty=30}) {
  const { loading, error } = useImportBooks({ loadQty });
  if (loading) return <div style={{textAlign: 'center', marginTop: '50vh'}}>Loading...</div>;
  if (error) {
    const msg = typeof error === 'string' ? error : error?.message || 'Unknown error';
    return <div style={{textAlign: 'center', marginTop: '50vh'}}> Error: {msg}</div>;
  }
}