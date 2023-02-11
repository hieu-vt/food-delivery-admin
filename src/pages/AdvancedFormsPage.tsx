import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { ValidationForm } from '@app/components/forms/ValidationForm/ValidationForm';
import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const AdvancedFormsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle>{t('common.advancedForms')}</PageTitle>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} xl={14}>
          <ValidationForm />
        </Col>
      </Row>
    </>
  );
};

export default AdvancedFormsPage;
