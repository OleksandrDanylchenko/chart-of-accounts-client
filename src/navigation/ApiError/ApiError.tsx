import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface IApiError {
  apiType: 'accounts' | 'syntheticAccounts' | 'subAccounts';
}

type ApiError = IApiError;

const ApiError: FunctionComponent<ApiError> = (props) => {
  const getErrorType = () => {
    switch (props.apiType) {
      case 'accounts':
        return 'рахунків';
      case 'syntheticAccounts':
        return 'синтетичних рахунків';
      case 'subAccounts':
        return 'суб рахунків';
    }
  };

  return (
    <div className={styles.container}>
      {/*<Icon name={'exclamation triangle'} size={'massive'} />*/}
      <h2 className={styles.title}>
        Вибачаємося за тимчасові незручності, але сервер не може відповісти на
        ваш запит щодо {getErrorType()}.
      </h2>
      <h3 className={styles.contactsMessage}>
        Спробуйте перезайти в додаток через декілька хвилин, або зв&apos;яжіться
        з адміністратором за посиланнями нижче:
      </h3>
      <div className={styles.contacts}>
        <a href="https://www.instagram.com/alexander.danilchenko/">
          {/*<Icon name={'instagram'} size={'huge'} />*/}
        </a>
        <a href="https://t.me/AlexD">
          {/*<Icon name={'telegram'} size={'huge'} />*/}
        </a>
      </div>
    </div>
  );
};

export default ApiError;
