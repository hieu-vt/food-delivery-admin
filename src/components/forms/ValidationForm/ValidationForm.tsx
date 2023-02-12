import { UploadOutlined } from '@ant-design/icons';
import { FoodRequest } from '@app/api/food.api';
import { Upload } from '@app/components/common/Upload/Upload';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input.styles';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doCreateFood } from '@app/store/slices/foodSlice';
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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onFinish = async (values: FoodRequest) => {
    setLoading(true);
    const newValue = {
      ...values,
      price: Number(values.price || 0),
      restaurantId: '3pZ7CkvTaDuyDU',
      images: [
        {
          url: 'https://media.istockphoto.com/id/481045024/photo/tran-quoc-pagoda.jpg?s=612x612&w=0&k=20&c=dmOYsZ05smQHjQl0HFY5Ll6cbD9lS6uKoxfzzvzv6gE=',
          width: 612,
          height: 406,
        },
      ],
    };
    console.log('newValue', newValue);
    // doCreateFood
    dispatch(doCreateFood(newValue))
      .unwrap()
      .then(() => {
        setLoading(false);
        notificationController.success({ message: t('common.success') });
        setFieldsChanged(false);
      })
      .catch((err: any) => {
        notificationController.error({ message: err.message });
        setLoading(false);
        setFieldsChanged(false);
      });
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
      <BaseButtonsForm.Item name="description" label={t('forms.controlFormLabels.description')}>
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
