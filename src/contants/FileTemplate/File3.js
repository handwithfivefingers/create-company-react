import React, { useEffect, useRef } from 'react';
import { Space, Row, Col, Card, Typography } from 'antd';
const File3 = React.forwardRef((props, ref) => {
	return (
		<div ref={ref}>
			<Space style={{}}>
				<Card bordered={false}>
					<Row gutter={[16, 12]} style={{ padding: '12px' }}>
						<Col span={24} align='center'>
							<Typography.Text strong>
								CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM 	<br />
							</Typography.Text>
							<Typography.Text strong>
								Độc lập - Tự do - Hạnh phúc 	<br />
							</Typography.Text>
							<Typography.Text strong>
								---o0o---
							</Typography.Text>

						</Col>
						<Col span={24} align='right'>
							<Typography.Text italic>	Tp. HCM ngày {new Date().getDate()} tháng{' '}
								{new Date().getMonth() * 1 + 1} năm {new Date().getFullYear()}	</Typography.Text>
						</Col>
						<Col span={24} align='center'>
							<Typography.Title level={5}>
								GIẤY UỶ QUYỀN
							</Typography.Title>

						</Col>
						<Col span={24} align='left'>
							<Typography.Text strong>		BÊN ỦY QUYỀN( BÊN A): <br /></Typography.Text>
							<Typography.Text strong>		Ông/bà: <br /></Typography.Text>
							<Typography.Text>
								Sinh ngày: ...... Dân tộc: ......	Quốc tịch: VIỆT NAM <br />
								CMND/CCCD số: ............................................ <br />
								Cấp ngày: ................ Nơi cấp: ................. <br />
								Nơi đăng ký hộ khẩu thường trú:
							</Typography.Text>
						</Col>

						<Col span={24} align='left'>
							<Typography.Text strong>		BÊN NHẬN ỦY QUYỀN( BÊN B): <br /></Typography.Text>
							<Typography.Text strong>		Ông/bà: <br /></Typography.Text>
							<Typography.Text>
								Sinh ngày: ...... Dân tộc: ......	Quốc tịch: VIỆT NAM <br />
								CMND/CCCD số: ............................................ <br />
								Cấp ngày: ................ Nơi cấp: ................. <br />
								Nơi đăng ký hộ khẩu thường trú:
							</Typography.Text>
						</Col>

						<Col span={24} align='left'>
							<Space direction="vertical">
								<Typography.Text strong>ĐIỀU 1: NỘI DUNG VÀ PHẠM VI ỦY QUYỀN</Typography.Text>
								<Typography.Text>
									Bên A ủy quyền cho bên B thực hiện các công việc sau đây: <br />
									Liên hệ Sở Kế Hoạch và Đầu Tư TP. Hồ Chí Minh để nộp hồ sơ và nhận kết quả đăng ký thành lập doanh nghiệp
									Kể từ ngày ký đến khi hoàn tất công việc tại quý cơ quan
								</Typography.Text>

								<Typography.Text strong>ĐIỀU 2: NGHĨA VỤ CỦA CÁC BÊN</Typography.Text>
								<Typography.Text>

									Bên A và bên B chịu trách nhiệm trước pháp luật về những lời cam đoan sau đây: <br />
									1/ Bên A chịu trách nhiệm cho bên B thực hiện trong phạm vi được ủy quyền<br />
									2/ Bên thực hiện theo ủy quyền phải báo cho bên A về việc thực hiện công việc nêu trên<br />
									3/ Việc giao kết giấy ủy quyền này hoàn toàn tự nguyện, không bị lừa dối hoặc ép buộc<br />
									4/ thực hiện đúng và đầy đủ các thảo thuận đã ghi trong giấy ủy quyền này<br />

								</Typography.Text>
								<Typography.Text strong>ĐIỀU 3: ĐIỀU KHOẢN CUỐI CÙNG</Typography.Text>
								<Typography.Text>
									1/ Hai bên công nhận đã hiểu rõ ủy quyền, nghĩa vụ và lợi ích hợp pháp của mình, ý nghĩa và hậu quả pháp lý của việc giao kết giấy ủy quyền này <br />
									2/ Hai bên đã tự đọc giấy ủy quyền, đã hiểu và đồng ý tất cả các điều khoản ghi trong giấy và ký vào giấy ủy quyền này <br />
									3/ Giấy ủy quyền có hiệu lực từ ngày ký<br />
								</Typography.Text>
							</Space>
						</Col>
						<Col span={24}>
							<Row>
								<Col span={12} align="center">
									<Typography.Text>
										<Typography.Text strong>Người được uỷ quyền</Typography.Text> <br />
										<Typography.Text italic>(ký, họ tên)</Typography.Text>
									</Typography.Text>
								</Col>
								<Col span={12} align="center">
									<Typography.Text>
										<Typography.Text strong>Người uỷ quyền</Typography.Text> <br />
										<Typography.Text italic>(ký, họ tên)</Typography.Text>
									</Typography.Text>
								</Col>
							</Row>
						</Col>
					</Row>
				</Card>
			</Space>
		</div >
	);
});

export default File3;
