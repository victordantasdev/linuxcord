// url, keyimport { createClient } from '@supabase/supabase-js';
import React from 'react';

export default function Teste({ SUPABASE_ANON_KEY, SUPABASE_URL }) {
  // const supabaseClient = createClient(SUPABASE_URL, props.);

  console.log(SUPABASE_ANON_KEY);
  console.log(SUPABASE_URL);

  return (
    <h1>Teste</h1>
  );
}

export async function getServerSideProps() {
  // const key = process.env.SUPABASE_ANON_KEY;
  // const url = process.env.SUPABASE_URL;

  const { SUPABASE_ANON_KEY, SUPABASE_URL } = process.env;

  return {
    props: {
      SUPABASE_ANON_KEY,
      SUPABASE_URL,
    },
  };
}
