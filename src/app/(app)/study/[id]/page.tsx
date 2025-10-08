
import React from 'react';
import StudyPackClientPage from './client-page';

// This is a Server Component that unwraps the params
export default function StudyPackPage({ params }: { params: Promise<{ id: string }> }) {
  // `React.use` can be used in Server Components to unwrap promises.
  const { id } = React.use(params);

  // Pass the resolved ID to the Client Component
  return <StudyPackClientPage id={id} />;
}
