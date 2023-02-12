import { Image } from '@app/api/food.api';
import { FoodResponse } from '@app/domain/FoodModal';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doGetFood } from '@app/store/slices/foodSlice';
import { Col, Image as ImageAnt, Row, Space, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BasicTableRow, Pagination } from 'api/table.api';
import { Table } from 'components/common/Table/Table';
import { Button } from 'components/common/buttons/Button/Button';
import { notificationController } from 'controllers/notificationController';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const BasicTable: React.FC = () => {
  const refInitialPagination = useRef<Pagination>({
    current: 1,
    pageSize: 10,
  });
  const [tableData, setTableData] = useState<{ data: BasicTableRow[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: refInitialPagination.current,
    loading: false,
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const fetch = useCallback((pagination: Pagination) => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    dispatch(doGetFood({ page: pagination.current, limit: pagination.pageSize }))
      .unwrap()
      .then((data: FoodResponse) => {
        const mappingDataTable = data.data.map((item, index) => ({
          key: index + new Date(item.created_at).getSeconds(),
          name: item.name,
          price: item.price,
          description: item.description,
          images: item.images,
          id: item.id,
        })) as unknown as BasicTableRow[];
        refInitialPagination.current.total = data.paging.total;
        setTableData((tableData) => ({
          ...tableData,
          data: [...tableData.data, ...mappingDataTable],
          pagination: pagination,
          loading: false,
        }));
      })
      .catch((err: any) => {
        notificationController.error({ message: err.message });
        setTableData((tableData) => ({ ...tableData, loading: false }));
      });
  }, []);

  useEffect(() => {
    fetch(refInitialPagination.current);
  }, [fetch]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    refInitialPagination.current = pagination;
    fetch(refInitialPagination.current);
  };

  const handleDeleteRow = (rowId: number) => {
    setTableData({
      ...tableData,
      data: tableData.data.filter((item) => item.key !== rowId),
      pagination: {
        ...tableData.pagination,
        total: tableData.pagination.total ? tableData.pagination.total - 1 : tableData.pagination.total,
      },
    });
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('common.name'),
      dataIndex: 'name',
      render: (text: string) => <span>{text}</span>,
      filterMode: 'tree',
      filterSearch: true,
      filters: [],
      onFilter: (value: string | number | boolean, record: BasicTableRow) => record.name.includes(value.toString()),
    },
    {
      title: t('common.price'),
      dataIndex: 'price',
      sorter: (a: BasicTableRow, b: BasicTableRow) => a.price - b.price,
      showSorterTooltip: false,
    },
    {
      title: t('common.description'),
      dataIndex: 'description',
    },
    {
      title: t('common.images'),
      key: 'images',
      dataIndex: 'images',
      render: (tags: Image[]) => (
        <Row gutter={[10, 10]}>
          {tags.map((image: Image) => {
            return (
              <Col key={image.url}>
                <ImageAnt src={image.url} width={image.width} height={image.height} />
              </Col>
            );
          })}
        </Row>
      ),
    },
    {
      title: t('tables.actions'),
      dataIndex: 'actions',
      width: '15%',
      render: (text: string, record: { name: string; key: number }) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
              }}
            >
              {t('tables.update')}
            </Button>
            <Button type="default" danger onClick={() => handleDeleteRow(record.key)}>
              {t('tables.delete')}
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData.data}
      pagination={tableData.pagination}
      loading={tableData.loading}
      onChange={handleTableChange}
      scroll={{ x: 800 }}
      bordered
    />
  );
};
