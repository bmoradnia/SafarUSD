import { GetServerSideProps } from 'next';
import { Button } from '@mui/material';
import { authBasic } from '../../utils/auth';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!authBasic(req, res)) {
    return { props: {} };
  }
  return { props: {} };
};

export default function Admin() {
  return (
    <div>
      <h1>پنل مدیریت</h1>
      <Button variant="contained">Configs</Button>
    </div>
  );
}
