import React from "react";

const SignIn = () => {
  return (
    <div className='container fluid'>
      <div className='row'>
        <div className='col-md-4 offset-md-4 mt-5'>
          <section className='text-center'>
            <h1>E-LEARN</h1>

            <h4 className='p-2'>Welcome Back</h4>

            <p>
              Don't have an account, <a href=''>Sign Up</a>
            </p>
          </section>

          <section className='p-4'>
            <form action=''>
              <label className='p-1' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='form-control p-2'
              />
              <label className='p-1 mt-2' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                className='form-control p-2'
              />
              <button
                type='button'
                className='btn btn-secondary w-100 rounded mt-3'
              >
                Sign In
              </button>
            </form>
            <p className='mt-1 text-center'>
              <a href=''>Forgot password?</a>
            </p>
          </section>
          <p className='text-center'>or</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
