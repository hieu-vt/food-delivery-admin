import { UploadOutlined } from '@ant-design/icons';
import { Upload } from '@app/components/common/Upload/Upload';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input.styles';
import { notificationController } from '@app/controllers/notificationController';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const normFile = (e = { fileList: [] }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const ValidationForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onFinish = async (values = {}) => {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setFieldsChanged(false);
    //   notificationController.success({ message: t('common.success') });
    // }, 1000);
  };

  return (
    <BaseButtonsForm
      {...formItemLayout}
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      name="CreateFoodForm"
      footer={
        <BaseButtonsForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {t('common.submit')}
          </Button>
        </BaseButtonsForm.Item>
      }
      onFinish={onFinish}
    >
      <BaseButtonsForm.Item name="name" label={t('forms.controlFormLabels.name')}>
        <Input />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="group" label={t('forms.controlFormLabels.description')}>
        <Input.TextArea />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="price" label={t('forms.controlFormLabels.price')}>
        <Input />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item
        name="upload"
        label={t('forms.validationFormLabels.upload')}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button type="default" icon={<UploadOutlined />}>
            {t('forms.validationFormLabels.clickToUpload')}
          </Button>
        </Upload>
      </BaseButtonsForm.Item>
    </BaseButtonsForm>
  );
};
