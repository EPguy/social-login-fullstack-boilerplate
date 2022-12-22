import { Button, Text, View } from 'react-native';
import { logout } from '@react-native-seoul/kakao-login';
import React from 'react';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../store/config';
import { AuthTypeEnum } from '../enum/AuthTypeEnum';

const UserInfoScreen = ({ navigation }: any) => {
  const { loginType } = useAppSelector((state) => state.auth);
  const { logoutServer } = useAuth();
  const { userInfo, getUserInfo } = useUser();
  const doLogout = async () => {
    switch (loginType) {
      case AuthTypeEnum.KAKAO:
        await logout();
        break;
    }

    const success = await logoutServer();
    if (success) {
      navigation.navigate('SigninScreen');
    }
  };

  return (
    <View>
      <Text>{userInfo?.nickname}</Text>
      <Button title="유저 정보 가져오기" onPress={() => getUserInfo()} />
      <Button title="로그아웃" onPress={() => doLogout()} />
    </View>
  );
};

export default UserInfoScreen;
