import { DataUserModal } from '@app/domain/UserModel';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './ProfileInfo.styles';
import { Avatar } from '@app/components/common/Avatar/Avatar';

interface ProfileInfoProps {
  profileData: DataUserModal | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  const [fullness] = useState(90);

  const { t } = useTranslation();

  return profileData ? (
    <S.Wrapper>
      <S.ImgWrapper>
        <Avatar shape="circle" src={profileData?.avatar?.url} alt="Profile" />
      </S.ImgWrapper>
      <S.Title>{`${profileData?.first_name} ${profileData?.last_name}`}</S.Title>
      <S.Subtitle>{profileData?.first_name}</S.Subtitle>
      <S.FullnessWrapper>
        <S.FullnessLine width={fullness}>{fullness}%</S.FullnessLine>
      </S.FullnessWrapper>
      <S.Text>{t('profile.fullness')}</S.Text>
    </S.Wrapper>
  ) : null;
};
