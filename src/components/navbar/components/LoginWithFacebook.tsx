import FacebookLogin, { FailResponse } from '@greatsumini/react-facebook-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { TypeUser } from '../../../interfaces';

type PropsFacebook = {
  success: (data: {
    accessToken?: string;
    email?: string;
    password?: string;
    tipo: TypeUser;
  }) => void;
  failure: (response: FailResponse) => void;
};

export const LoginWithFacebook = ({ success, failure }: PropsFacebook) => {
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_KEY_FACEBOOK as string}
      autoLoad={false}
      onSuccess={(value: any) =>
        success({
          accessToken: value.accessToken,
          tipo: TypeUser.FACEBOOK
        })
      }
      onFail={failure}
      onProfileSuccess={(response) => {
        console.log('Response Profile', response);
      }}
      render={(renderProps) => (
        <FacebookLoginButton
          onClick={renderProps.onClick}
          text={'Iniciar con Facebook'}
        />
      )}
    />
  );
};
