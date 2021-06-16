import React, { Suspense } from 'react';

export const withLazyComponent = (LazyComponent) => {
  return (props) => (
    <Suspense fallback="Lazy component is loading ...">
      <LazyComponent {...props} />
    </Suspense>
  )
}