import React, { useEffect } from 'react';

const SignIn = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Sign In - Notedly';
  });

  return (
    <div>
      <p>Sign In</p>
    </div>
  );
};

export default SignIn;
