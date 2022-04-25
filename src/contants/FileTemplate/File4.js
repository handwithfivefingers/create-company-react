import React, { useEffect, useRef } from 'react';
import { Space, Row, Col, Card, Typography, Table } from 'antd';
const Danhsachnguoidaidien = [
	{
		"STT": "1",
		"CSH": "xxxxx",
		"Tennguoidaidien": "xxx%",
		"Ngaythangnam": "xxx%",
		"Gioitinh": "xxx",
		"Quoctich": "xxx",
		"Dantoc": "xxx",
		"Diachi": "xxx",
		"Songaycap": "xxx",
		"Tongvonbangso": "xxx",
		"Tyle": "xxx",
		"Thoidiem": "xxx",
		"Chuky": "xxx",
		"Ghichu": "xxx",
	},
]

const File4 = React.forwardRef((props, ref) => {

	const getPageMargins = () => {
		return `@page { margin: 24px !important; }`;
	};

	return (
		<div ref={ref}>
			<style>
				{getPageMargins()}
			</style>
			<Space style={{}}>
				<Card bordered={false}>
					<Row gutter={[16, 12]} style={{ padding: '12px' }}>
						<Col span={24} align='center'>
							<Typography.Text strong>
								Phụ lục I-10<br />
							</Typography.Text>
							<Typography.Text italic>
								(Ban hành kèm theo Thông tư số 01/2021/TT-BKHĐT ngày 16 tháng 03 năm 2021 của Bộ trưởng Bộ Kế hoạch và Đầu tư)<br />
							</Typography.Text>
							<Typography.Text strong>
								______________________<br />
								DANH SÁCH NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT/NGƯỜI ĐẠI DIỆN THEO UỶ QUYỀN1 {/**Số 1 font nhỏ, chú thích phía dưới */}  <br />
							</Typography.Text>
						</Col>
						<Col span={24} align='left'>

							<Table dataSource={Danhsachnguoidaidien} pagination={false}>
								<Table.Column title="STT" render={(val, record, i) => i + 1} />
								<Table.Column title="Chủ sở hữu/Thành viên công ty TNHH/Cổ đông sáng lập/Cổ đông là tổ chức nước ngoài" render={(val, record, i) => i + 1} />
								<Table.Column title="Tên người đại diện theo pháp luật/người đại diện theo uỷ quyền" render={(val, record, i) => i + 1} />
								<Table.Column title="Ngày, tháng, năm sinh" render={(val, record, i) => i + 1} />
								<Table.Column title="Ngày, tháng, năm sinh" render={(val, record, i) => i + 1} />
								<Table.Column title="Giới tính" render={(val, record, i) => i + 1} />
								<Table.Column title="Quốc tịch" render={(val, record, i) => i + 1} />
								<Table.Column title="Dân tộc" render={(val, record, i) => i + 1} />
								<Table.Column title="Địa chỉ liên lạc" render={(val, record, i) => i + 1} />
								<Table.Column title="Số, ngày cấp, cơ quan cấp Giấy tờ pháp lý của cá nhân" render={(val, record, i) => i + 1} />
								
								{/**3 cột  này chung 1 cốt lớn là "Vốn được uỷ quyền2". Số 2 font nhỏ*/}
								<Table.Column title="Tổng giá trị vốn được đại diện (bằng số; VNĐ và giá trị tương đương theo đơn vị tiền nước ngoài, nếu có" render={(val, record, i) => i + 1} />
								<Table.Column title="Tỷ lệ (%)" render={(val, record, i) => i + 1} />
								<Table.Column title="Thời điểm đại diện phần vốn " render={(val, record, i) => i + 1} />
								{/**3 cột  này chung 1 cốt lớn là "Vốn được uỷ quyền2". Số 2 font nhỏ*/}

								<Table.Column title="Chữ ký của người đại diện theo pháp luật/người đại diện theo uỷ quyền " render={(val, record, i) => i + 1} />
								<Table.Column title="Ghi chú" render={(val, record, i) => i + 1} />
							</Table>
						</Col>
						<Col span={24}>
							<Row>
								<Col span={12} align="center">
									<Typography.Text>
										<Typography.Text strong></Typography.Text> <br />
										<Typography.Text italic></Typography.Text>
									</Typography.Text>
								</Col>
								<br />
								<Col span={12} align="center">
									<Typography.Text>
										<Typography.Text italic>……, ngày……tháng……năm……</Typography.Text> <br />
										<Typography.Text strong>NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT/</Typography.Text><br />
										<Typography.Text strong>CHỦ TỊCH CÔNG TY/CHỦ TỊCH HỘI ĐỒNG THÀNH VIÊN/</Typography.Text><br />
										<Typography.Text strong>CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ CỦA CÔNG TY</Typography.Text><br />
										<Typography.Text italic>(Ký và ghi họ tên) </Typography.Text> <br />
										{/**Chừa khoảng trống đề ký và ghi họ tên*/}
									</Typography.Text>
								</Col>
							</Row>
						</Col>
						<Col span={24} align='left'>
							________________<br />
							{/**Từ dưới đường divider này font chữ nhỏ, dạng chú thích */}
							<Typography.Text>
								Áp dụng cho Chủ sở hữu/Thành viên công ty TNHH/Cổ đông sáng lập/Cổ đông là nhà đầu tư nước ngoài là tổ chức. Doanh nghiệp lựa chọn kê khai người đại diện theo pháp luật hoặc người đại diện theo uỷ quyền.<br />
								Không phải kê khai phần này đối với trường hợp kê khai người đại diện theo pháp luật.<br />
								Người được kê khai thông tin ký vào phần này.<br />
								Người đại diện theo uỷ quyền không thay đổi không bắt buộc phải ký vào phần này.<br />
								Trường hợp đăng ký/thông báo thay đổi nội dung đăng ký doanh nghiệp theo quyết định của Tòa án hoặc Trọng tài thì không cần chữ ký tại phần này.<br />
								- Người đại diện theo pháp luật của doanh nghiệp ký trực tiếp vào phần này.<br />
								- Trường hợp đăng ký chuyển đổi loại hình doanh nghiệp đồng thời đăng ký thay đổi người đại diện theo pháp luật thì Chủ tịch công ty/Chủ tịch Hội đồng thành viên/Chủ tịch Hội đồng quản trị của công ty sau chuyển đổi ký trực tiếp vào phần này.<br />
								- Trường hợp Tòa án hoặc Trọng tài chỉ định người thực hiện thủ tục đăng ký doanh nghiệp thì người được chỉ định ký trực tiếp vào phần này.<br />
							</Typography.Text>

						</Col>

					</Row>
				</Card>
			</Space>
		</div >
	);
});

export default File4;
