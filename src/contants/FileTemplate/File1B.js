import React, { useEffect, useRef } from 'react';
import { Space, Row, Col, Card, Typography, Table } from 'antd';
import { getPageMargins } from '../../helper/Common';
const Nganhnghekinhdoanh = [
	{
		"STT": "1",
		"Tennganh": "xxxxx",
		"Manganh": "xxx%",
		"Nganhchinh": "xxx%"
	},
]
const File1B = React.forwardRef((props, ref) => {

	return (
		<div ref={ref}>

			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>
						CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM<br />
					</Typography.Text>
					<Typography.Text strong>
						Độc lập - Tự do - Hạnh phúc 	<br />
					</Typography.Text>
					<Typography.Text strong>
						______________________
					</Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Title level={5}>
						ĐIỀU LỆ
					</Typography.Title>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Title level={5}>
						CÔNG TY TNHH MỘT THÀNH VIÊN.........
					</Typography.Title>
				</Col>	</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Paragraph>
						Tên tổ chức: … … …<br />
						Mã số doanh nghiệp: … … …<br />
						Ngày cấp: … …  …	Cơ quan cấp: … … …<br />
						Công ty …….. là Chủ sở hữu của Công ty TNHH …. đồng ý ký tên và chấp thuận thành lập Công ty TNHH …. với Điều lệ được thông qua theo quy định của Luật Doanh nghiệp số 59/2020/QH14  được Quốc Hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam thông qua ngày 17/6/2020, gồm các điều, khoản của Điều lệ này như sau:<br />
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>Chương I<br /></Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>
						QUY ĐỊNH CHUNG
					</Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>
						Điều 1. Tư cách pháp nhân, phạm vi trách nhiệm, thời hạn hoạt động
					</Typography.Text><br />
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Paragraph>
						1. Công ty là một pháp nhân độc lập và có tư cách pháp nhân theo Luật pháp Việt Nam. Tất cả hoạt động của Công ty được điều chỉnh bởi Luật pháp Việt Nam và theo các quy định tại Giấy chứng nhận đăng ký doanh nghiệp, Điều lệ này và bất kỳ giấy phép hoặc cấp phép của Cơ quan Nhà nước, cần thiết cho hoạt động kinh doanh của Công ty.<br />
						2. Chủ sở hữu chịu trách nhiệm về các khoản nợ và các nghĩa vụ tài sản khác của doanh nghiệp trong phạm vi số vốn điều lệ của doanh nghiệp<br />
						3. Thời hạn hoạt động của công ty là: 50 năm kể từ ngày được cơ quan đăng ký kinh doanh cấp Giấy chứng nhận đăng ký doanh nghiệp. Công ty có thể chấm dứt hoạt động trước thời hạn hoặc kéo dài thêm thời gian hoạt động theo quyết định của Chủ sở hữu hoặc theo quy định của pháp luật.<br />
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>Điều 2. Tên Doanh nghiệp</Typography.Text><br />
					<Typography.Paragraph>
						Tên công ty viết bằng tiếng Việt <Typography.Text italic>(ghi bằng chữ in hoa)</Typography.Text>: ...... ...<br /> {/**GHI BẰNG CHỮ IN HOA */}
						Tên công ty viết bằng tiếng nước ngoài <Typography.Text italic>(nếu có)</Typography.Text>: ... .. ...<br />
						Tên công ty viết tắt <Typography.Text italic>(nếu có)</Typography.Text>: .. ... ...<br />
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>Điều 3. Trụ sở chính và địa chỉ chi nhánh, văn phòng đại diện</Typography.Text><br />
					<Typography.Paragraph>
						Địa chỉ trụ sở chính:.... ...<br />
						Địa chỉ chi nhánh <Typography.Text italic>(nếu có)</Typography.Text>: ... .. ...<br />
						Địa chỉ văn phòng đại diện <Typography.Text italic>(nếu có)</Typography.Text>: ...  ...<br />
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>Điều 4. Ngành, nghề kinh doanh</Typography.Text><br />
					<Table
						dataSource={Nganhnghekinhdoanh}
						pagination={false}
						size="small"
					>
						<Table.Column title="STT" render={(val, record, i) => i + 1} />
						<Table.Column title="Tên ngành" render={(val, record, i) => i + 1} />
						<Table.Column title="Mã ngành" render={(val, record, i) => i + 1} />
						<Table.Column title="Ngành chính" render={(val, record, i) => i + 1} />
					</Table>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>Điều 5. Người đại diện theo pháp luật</Typography.Text><br />

					{/**TRƯỜNG HỢP CÓ 01 NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT */}
					<Typography.Paragraph>
						1. Số lượng người đại diện theo pháp luật: Công ty có 01 người là người đại diện theo pháp luật, chức danh: …... {/**chọn 01 trong 03 chức danh: Chủ tịch công ty / Giám đốc / Tổng Giám đốc)*/}<br />
						Họ và tên người đại diện theo pháp luật: … …	Giới tính: … …<br />
						Sinh ngày: ……		Dân tộc: … 		Quốc tịch: Việt Nam<br />
						Loại giấy tờ pháp lý: ..…..<br />
						Số giấy tờ pháp lý:  …		Ngày cấp: …,,…	Nơi cấp: …..…<br />
						Địa chỉ thường trú: …….<br />
						Địa chỉ liên lạc: ……<br />
						2. Quyền và nghĩa vụ của người đại diện theo pháp luật:<br />
						{/**Đối với chức danh là Chủ tịch công ty thì ghi*/}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 8, 10 Điều lệ công ty.<br />
						{/**Đối với chức danh Giám đốc thì ghi*/}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 11 Điều lệ công ty.<br />
						{/**Đối với chức danh Tổng Giám đốc thì ghi */}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 11 Điều lệ công ty. <br />
					</Typography.Paragraph>

					{/**TRƯỜNG HỢP CÓ HƠN 01 NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT */}
					<Typography.Paragraph>
						1. Số lượng người đại diện theo pháp luật: Công ty có ….{/**Có mấy người đại diện thì hiện số ở đây */} người là người đại diện theo pháp luật.<br />
						2. Người đại diện theo pháp luật:
						a) Họ và tên người đại diện theo pháp luật thứ 1: …… 	Giới tính: … <br />
						Chức danh:...{/**chọn 01 trong 03 chức danh: Chủ tịch công ty / Giám đốc / Tổng Giám đốc)*/}<br />
						Sinh ngày: ……		Dân tộc: ……		Quốc tịch: Việt Nam <br />
						Loại giấy tờ pháp lý: ....<br />
						Số giấy tờ pháp lý: …		Ngày cấp: ……	Nơi cấp: … …<br />
						Địa chỉ thường trú: … <br />
						Địa chỉ liên lạc: …<br />
						Quyền và nghĩa vụ của người đại diện theo pháp luật:<br />
						{/**Đối với chức danh là Chủ tịch công ty thì ghi*/}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 8, 10 Điều lệ công ty.<br />
						{/**Đối với chức danh Giám đốc thì ghi*/}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 11 Điều lệ công ty.<br />
						{/**Đối với chức danh Tổng Giám đốc thì ghi */}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 11 Điều lệ công ty. <br />

						b) Họ và tên người đại diện theo pháp luật thứ 2: ……	Giới tính: …<br />
						Chức danh: … …{/**chọn 01 trong 03 chức danh: Chủ tịch công ty / Giám đốc / Tổng Giám đốc)*/}<br />
						Sinh ngày: …		Dân tộc: ……		Quốc tịch: Việt Nam <br />
						Loại giấy tờ pháp lý: ....<br />
						Số giấy tờ pháp lý: ...		Ngày cấp: ……	Nơi cấp: … <br />
						Địa chỉ thường trú: … …<br />
						Địa chỉ liên lạc: …<br />
						Quyền và nghĩa vụ của người đại diện theo pháp luật:<br />
						{/**Đối với chức danh là Chủ tịch công ty thì ghi*/}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 8, 10 Điều lệ công ty.<br />
						{/**Đối với chức danh Giám đốc thì ghi*/}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 11 Điều lệ công ty.<br />
						{/**Đối với chức danh Tổng Giám đốc thì ghi */}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 11 Điều lệ công ty. <br />

						{/**Nếu có 3 người đại diện mới hiện thêm phần (c) này*/}
						c) Họ và tên người đại diện theo pháp luật thứ 3: ……	Giới tính: …<br />
						Chức danh: … …{/**chọn 01 trong 03 chức danh: Chủ tịch công ty / Giám đốc / Tổng Giám đốc)*/}<br />
						Sinh ngày: …		Dân tộc: ……		Quốc tịch: Việt Nam <br />
						Loại giấy tờ pháp lý: ....<br />
						Số giấy tờ pháp lý: ...		Ngày cấp: ……	Nơi cấp: … <br />
						Địa chỉ thường trú: … …<br />
						Địa chỉ liên lạc: …<br />
						Quyền và nghĩa vụ của người đại diện theo pháp luật:<br />
						{/**Đối với chức danh là Chủ tịch công ty thì ghi*/}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 8, 10 Điều lệ công ty.<br />
						{/**Đối với chức danh Giám đốc thì ghi*/}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 11 Điều lệ công ty.<br />
						{/**Đối với chức danh Tổng Giám đốc thì ghi */}
						Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 11 Điều lệ công ty. <br />

						{/**Mục (3) này cả 2 trường hợp đều có*/}
						3. Trách nhiệm của người đại diện theo pháp luật của doanh nghiệp<br />
						Người đại diện theo pháp luật của doanh nghiệp có trách nhiệm sau đây:<br />
						a) Thực hiện quyền và nghĩa vụ được giao một cách trung thực, cẩn trọng, tốt nhất nhằm bảo đảm lợi ích hợp pháp của doanh nghiệp;<br />
						b) Trung thành với lợi ích của doanh nghiệp; không lạm dụng địa vị, chức vụ và sử dụng thông tin, bí quyết, cơ hội kinh doanh, tài sản khác của doanh nghiệp để tư lợi hoặc phục vụ lợi ích của tổ chức, cá nhân khác;<br />
						c) Thông báo kịp thời, đầy đủ, chính xác cho doanh nghiệp về doanh nghiệp mà mình, người có liên quan của mình làm chủ hoặc có cổ phần, phần vốn góp theo quy định của Luật Doanh nghiệp.<br />
						Người đại diện theo pháp luật của doanh nghiệp chịu trách nhiệm cá nhân đối với thiệt hại cho doanh nghiệp do vi phạm trách nhiệm quy định tại khoản 3 Điều này.<br />
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>Chương II<br /></Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>
						VỐN VÀ CHỦ SỞ HỮU CÔNG TY
					</Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>
						Điều 6. Vốn điều lệ, chủ sở hữu công ty
					</Typography.Text><br />
					<Typography.Paragraph>
						1. Vốn điều lệ của công ty là: ... ..49. ... đồng (Ghi bằng chữ: ... .50.. ... đồng), trong đó bao gồm:<br />
						- Tiền Việt Nam:  ...... ...  đồng (Ghi bằng chữ: ... .. ...  đồng)<br />
						- Ngoại tệ tự do chuyển đổi: ... ... ...<br />
						- Vàng: … … …<br />
						- Tài sản khác:  ... ... ...<br />

						2. Thông tin về chủ sở hữu công ty:<br />
						Họ và tên: …… …	Giới tính: … …<br />
						Sinh ngày: ……		Dân tộc: ……		Quốc tịch: Việt Nam<br />
						Loại giấy tờ pháp lý: …...<br />
						Số giấy tờ pháp lý: ……		Ngày cấp: ……	Nơi cấp: … <br />
						Địa chỉ thường trú: … ……<br />
						Địa chỉ liên lạc: ……<br />
					</Typography.Paragraph>
					<br />
					<Typography.Text strong>
						Điều 7. Góp vốn thành lập công ty
					</Typography.Text><br />
					<Typography.Paragraph>
						1. Vốn điều lệ của công ty trách nhiệm hữu hạn một thành viên khi đăng ký thành lập doanh nghiệp là tổng giá trị tài sản do chủ sở hữu công ty cam kết góp và ghi trong Điều lệ công ty.<br />
						2. Chủ sở hữu công ty phải góp vốn cho công ty đủ và đúng loại tài sản đã cam kết khi đăng ký thành lập doanh nghiệp trong thời hạn 90 ngày kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp, không kể thời gian vận chuyển, nhập khẩu tài sản góp vốn, thực hiện thủ tục hành chính để chuyển quyền sở hữu tài sản. Trong thời hạn này, chủ sở hữu công ty có các quyền và nghĩa vụ tương ứng với phần vốn góp đã cam kết.<br />
						3. Trường hợp không góp đủ vốn điều lệ trong thời hạn quy định tại khoản 2 Điều này, chủ sở hữu công ty phải đăng ký thay đổi vốn điều lệ bằng giá trị số vốn đã góp trong thời hạn 30 ngày kể từ ngày cuối cùng phải góp đủ vốn điều lệ. Trường hợp này, chủ sở hữu phải chịu trách nhiệm tương ứng với phần vốn góp đã cam kết đối với các nghĩa vụ tài chính của công ty phát sinh trong thời gian trước ngày cuối cùng công ty đăng ký thay đổi vốn điều lệ theo quy định tại khoản này.<br />
						4. Chủ sở hữu công ty chịu trách nhiệm bằng toàn bộ tài sản của mình đối với các nghĩa vụ tài chính của công ty, thiệt hại xảy ra do không góp, không góp đủ, không góp đúng hạn vốn điều lệ theo quy định tại Điều này.<br />
					</Typography.Paragraph>
					<br />
					<Typography.Text strong>
						Điều 8. Quyền và nghĩa vụ của chủ sở hữu công ty
					</Typography.Text><br />
					<Typography.Text strong>
						- Quyền của chủ sở hữu công ty.
					</Typography.Text><br />
					<Typography.Paragraph>
						1. Quyết định nội dung Điều lệ công ty, sửa đổi, bổ sung Điều lệ công ty;<br />
						2. Quyết định chiến lược phát triển và kế hoạch kinh doanh hằng năm của công ty;<br />
						3. Quyết định cơ cấu tổ chức quản lý công ty, bổ nhiệm, miễn nhiệm, bãi nhiệm người quản lý, Kiểm soát viên của công ty;<br />
						4. Quyết định dự án đầu tư phát triển;<br />
						5. Quyết định các giải pháp phát triển thị trường, tiếp thị và công nghệ;<br />
						6. Thông qua hợp đồng vay, cho vay, bán tài sản và các hợp đồng khác có giá trị từ 50% tổng giá trị tài sản trở lên được ghi trong báo cáo tài chính gần nhất của công ty hoặc một tỷ lệ hoặc giá trị khác nhỏ hơn quy định tại Điều lệ công ty (nếu có);<br />
						7. Thông qua báo cáo tài chính của công ty;<br />
						8. Quyết định tăng vốn điều lệ của công ty; chuyển nhượng một phần hoặc toàn bộ vốn điều lệ của công ty cho tổ chức, cá nhân khác; quyết định phát hành trái phiếu;<br />
						9. Quyết định thành lập công ty con, góp vốn vào công ty khác;<br />
						10. Tổ chức giám sát và đánh giá hoạt động kinh doanh của công ty;<br />
						11. Quyết định việc sử dụng lợi nhuận sau khi đã hoàn thành nghĩa vụ thuế và các nghĩa vụ tài chính khác của công ty;<br />
						12. Quyết định tổ chức lại, giải thể và yêu cầu phá sản công ty;<br />
						13. Thu hồi toàn bộ giá trị tài sản của công ty sau khi công ty hoàn thành giải thể hoặc phá sản;<br />
						14. Quyền khác theo quy định của Luật Doanh nghiệp và Điều lệ công ty (nếu có).<br />
					</Typography.Paragraph>
					<Typography.Text strong>
						- Nghĩa vụ của Chủ sở hữu Công ty
					</Typography.Text><br />
					<Typography.Paragraph>
						1. Góp đủ và đúng hạn vốn điều lệ công ty.<br />
						2. Tuân thủ Điều lệ công ty.<br />
						3. Phải xác định và tách biệt tài sản của chủ sở hữu công ty với tài sản của công ty. Chủ sở hữu công ty là cá nhân phải tách biệt chi tiêu của cá nhân và gia đình mình với chi tiêu của Chủ tịch công ty, Giám đốc (hoặc Tổng giám đốc).<br />
						4. Tuân thủ quy định của pháp luật về hợp đồng và quy định khác của pháp luật có liên quan trong việc mua, bán, vay, cho vay, thuê, cho thuê, hợp đồng, giao dịch khác giữa công ty và chủ sở hữu công ty.<br />
						5. Chủ sở hữu công ty chỉ được quyền rút vốn bằng cách chuyển nhượng một phần hoặc toàn bộ vốn điều lệ cho tổ chức hoặc cá nhân khác; trường hợp rút một phần hoặc toàn bộ vốn điều lệ đã góp ra khỏi công ty dưới hình thức khác thì chủ sở hữu công ty và cá nhân, tổ chức có liên quan phải liên đới chịu trách nhiệm về các khoản nợ và nghĩa vụ tài sản khác của công ty.<br />
						6. Chủ sở hữu công ty không được rút lợi nhuận khi công ty không thanh toán đủ các khoản nợ và nghĩa vụ tài sản khác đến hạn.<br />
						7. Nghĩa vụ khác theo quy định của Luật Doanh nghiệp và Điều lệ công ty <Typography.Text italic>(nếu có)</Typography.Text>.<br />
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>Chương III<br /></Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>
						CƠ CẤU TỔ CHỨC QUẢN LÝ CÔNG TY
					</Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>
						Điều 9. Cơ cấu tổ chức quản lý công ty
					</Typography.Text><br />
					<Typography.Paragraph>
						Công ty trách nhiệm hữu hạn một thành viên do tổ chức làm chủ sở hữu được tổ chức quản lý và hoạt động theo mô hình gồm có: Chủ tịch công ty, Giám đốc (hoặc Tổng giám đốc).
					</Typography.Paragraph>
					<br />
					<Typography.Text strong>
						Điều 10. Chủ tịch công ty
					</Typography.Text><br />
					<Typography.Paragraph>
						1. Chủ tịch công ty nhân danh chủ sở hữu công ty thực hiện quyền và nghĩa vụ của chủ sở hữu công ty; nhân danh công ty thực hiện quyền và nghĩa vụ của công ty, trừ quyền và nghĩa vụ của Giám đốc (hoặc Tổng giám đốc); chịu trách nhiệm trước pháp luật và chủ sở hữu công ty về việc thực hiện quyền và nghĩa vụ được giao theo quy định của Điều lệ công ty, Luật Doanh nghiệp và quy định khác của pháp luật có liên quan.<br />
						2. Quyền, nghĩa vụ và chế độ làm việc của Chủ tịch công ty được thực hiện theo quy định tại Điều lệ công ty, Luật Doanh nghiệp và quy định khác của pháp luật có liên quan.<br />
						3. Quyết định của Chủ tịch công ty về thực hiện quyền và nghĩa vụ của chủ sở hữu công ty có hiệu lực kể từ ngày được chủ sở hữu công ty phê duyệt.<br />
					</Typography.Paragraph>
					<br />
					<Typography.Text strong>
						Điều 11. Giám đốc (hoặc Tổng giám đốc)
					</Typography.Text><br />
					<Typography.Paragraph>
						1. Chủ tịch công ty bổ nhiệm hoặc thuê Giám đốc (hoặc Tổng giám đốc) với nhiệm kỳ không quá 05 năm để điều hành hoạt động kinh doanh hằng ngày của công ty. Giám đốc (hoặc Tổng giám đốc) chịu trách nhiệm trước pháp luật và Chủ tịch công ty về việc thực hiện quyền và nghĩa vụ của mình. Chủ tịch công ty có thể kiêm Giám đốc (hoặc Tổng giám đốc).<br />
						2. Giám đốc (hoặc Tổng giám đốc) có quyền và nghĩa vụ sau đây:<br />
						a) Tổ chức thực hiện nghị quyết, quyết định của Chủ tịch công ty;<br />
						b) Quyết định các vấn đề liên quan đến hoạt động kinh doanh hằng ngày của công ty;<br />
						c) Tổ chức thực hiện kế hoạch kinh doanh và phương án đầu tư của công ty;<br />
						d) Ban hành quy chế quản lý nội bộ của công ty;<br />
						đ) Bổ nhiệm, miễn nhiệm, bãi nhiệm người quản lý công ty, trừ các chức danh thuộc thẩm quyền của Chủ tịch công ty;<br />
						e) Ký hợp đồng nhân danh công ty, trừ trường hợp thuộc thẩm quyền của Chủ tịch công ty;<br />
						g) Kiến nghị phương án cơ cấu tổ chức công ty;<br />
						h) Trình báo cáo tài chính hằng năm lên Chủ tịch công ty;<br />
						i) Kiến nghị phương án sử dụng lợi nhuận hoặc xử lý lỗ trong kinh doanh;<br />
						k) Tuyển dụng lao động; <br />
						l) Quyền và nghĩa vụ khác được quy định tại Điều lệ công ty và hợp đồng lao động.<br />
						3. Giám đốc (hoặc Tổng giám đốc) phải có tiêu chuẩn và điều kiện sau đây:<br />
						a) Không thuộc đối tượng quy định tại khoản 2 Điều 17 của Luật Doanh nghiệp;<br />
						b) Có trình độ chuyên môn, kinh nghiệm trong quản trị kinh doanh của công ty.<br />
					</Typography.Paragraph>
					<br />
					<Typography.Text strong>
						Điều 12. Tiền lương, thù lao, thưởng và lợi ích khác của người quản lý công ty
					</Typography.Text><br />
					<Typography.Paragraph>
						1. Người quản lý công ty được hưởng tiền lương, thù lao, thưởng và lợi ích khác theo kết quả và hiệu quả kinh doanh của công ty.<br />
						2. Chủ sở hữu công ty quyết định mức tiền lương, thù lao, thưởng và lợi ích khác của Chủ tịch công ty. Thù lao, tiền lương và lợi ích khác của người quản lý công ty được tính vào chi phí kinh doanh theo quy định của pháp luật về thuế thu nhập doanh nghiệp, pháp luật có liên quan và được thể hiện thành mục riêng trong báo cáo tài chính hằng năm của công ty.<br />
						3. Tiền lương, thù lao, thưởng và lợi ích khác của Kiểm toán viên có thể do chủ sở hữu công ty chi trả trực tiếp theo quy định.<br />
					</Typography.Paragraph>
					<br />
					<Typography.Text strong>
						Điều 13. Nguyên tắc giải quyết tranh chấp nội bộ
					</Typography.Text><br />
					<Typography.Paragraph>
						1. Các tranh chấp nội bộ giữa Công ty liên quan đến thành lập, hoạt động, giải thể Công ty trước hết phải được giải quyết thông qua thương lượng, hoà giải.<br />
						2. Trường hợp giải quyết tranh chấp nội bộ theo phương thức thương lượng, hòa giải không đạt được kết quả thì bất kỳ bên nào cũng có quyền đưa tranh chấp ra Tòa án có thẩm quyền để giải quyết.<br />
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>Chương IV<br /></Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>
						NĂM TÀI CHÍNH,  PHÂN PHỐI LỢI NHUẬN
					</Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>
						Điều 14. Năm tài chính
					</Typography.Text><br />
					<Typography>
						Năm tài chính của Công ty bắt đầu từ ngày đầu tiên của tháng 1 (một) hàng năm và kết thúc vào ngày thứ 31 của tháng 12.<br />
						Năm tài chính đầu tiên bắt đầu từ ngày cấp Giấy chứng nhận đăng ký doanh nghiệp và kết thúc vào ngày thứ 31 của tháng 12 ngay sau ngày cấp Giấy chứng nhận đăng ký doanh nghiệp đó.<br />
					</Typography>
					<br />
					<Typography.Text strong>
						Điều 15. Phân phối lợi nhuận, lập quỹ, Nguyên tắc xử lý lỗ trong kinh doanh
					</Typography.Text><br />
					<Typography.Paragraph>
						1.	Sau khi đã hoàn thành nghĩa vụ nộp thuế và các nghĩa vụ tài chính khác theo quy định của pháp luật, đã thanh toán đủ (hoặc đã dành phần thanh toán đủ) các khoản nợ và nghĩa vụ tài sản khác đã đến hạn phải trả công ty lập các loại quỹ theo quy định của pháp luật<br />
						2.	Các vấn đề khác liên quan đến phân phối lợi nhuận được thực hiện theo quy định của pháp luật.<br />
						3. Trường hợp quyết toán năm tài chính bị lỗ, Chủ tịch công ty được quyết định theo các hướng sau:<br />
						a) Trích quỹ dự trữ để bù;<br />
						b) Chuyển sang năm sau để trừ vào lợi nhuận của năm tài chính sau trước khi phân phối lợi nhuận.<br />
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>Chương V<br /></Typography.Text>
				</Col>	</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>
						THÀNH LẬP, TỔ CHỨC LẠI, GIẢI THỂ
					</Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>
						Điều 16. Thành lập, tổ chức lại
					</Typography.Text><br />
					<Typography.Paragraph>
						Công ty được thành lập sau khi Bản điều lệ này được Chủ sở hữu thông qua và được Cơ quan đăng ký kinh doanh cấp Giấy chứng nhận đăng ký doanh nghiệp.<br />
						Mọi phí tổn liên hệ đến việc thành  lập công ty đều được ghi vào mục chi phí của công ty và được tính hoàn giảm vào chi phí của năm tài chính đầu tiên đầu tiên.<br />
						Việc tổ chức lại doanh nghiệp (chia, tách, hợp nhất, sáp nhập hoặc chuyển đổi loại hình doanh nghiệp) công ty thực hiện quy định của Luật Doanh nghiệp.<br />
					</Typography.Paragraph>
					<br />
					<Typography.Text strong>
						Điều 17. Các trường hợp và điều kiện giải thể doanh nghiệp
					</Typography.Text><br />
					<Typography>
						1. Công ty bị giải thể trong các trường hợp sau đây:<br />
						a) Kết thúc thời hạn hoạt động đã ghi trong Điều lệ công ty mà không có quyết định gia hạn;<br />
						b) Theo nghị quyết, quyết định của Chủ sở hữu;<br />
						c) Bị thu hồi Giấy chứng nhận đăng ký doanh nghiệp, trừ trường hợp Luật Quản lý thuế có quy định khác.<br />
						2. Công ty chỉ được giải thể khi bảo đảm thanh toán hết các khoản nợ và nghĩa vụ tài sản khác và doanh nghiệp không trong quá trình giải quyết tranh chấp tại Tòa án hoặc cơ quan trọng tài. Người quản lý có liên quan và doanh nghiệp quy định tại điểm b khoản 1 Điều này cùng liên đới chịu trách nhiệm về các khoản nợ của doanh nghiệp.<br />
					</Typography>
					<br />
					<Typography.Text strong>
						Điều 18. Trình tự, thủ tục thanh lý tài sản và giải thể doanh nghiệp
					</Typography.Text><br />
					<Typography.Paragraph>
						Việc giải thể doanh nghiệp trong các trường hợp quy định tại khoản 1 Điều 17 của Điều lệ này được thực hiện theo quy định sau đây:<br />
						1. Thông qua nghị quyết, quyết định giải thể doanh nghiệp. Nghị quyết, quyết định giải thể doanh nghiệp phải bao gồm các nội dung chủ yếu sau đây:<br />
						a) Tên, địa chỉ trụ sở chính của doanh nghiệp;<br />
						b) Lý do giải thể;<br />
						c) Thời hạn, thủ tục thanh lý hợp đồng và thanh toán các khoản nợ của doanh nghiệp;<br />
						d) Phương án xử lý các nghĩa vụ phát sinh từ hợp đồng lao động;<br />
						đ) Họ, tên, chữ ký của chủ sở hữu công ty.<br />
						2. Chủ sở hữu công ty trực tiếp tổ chức thanh lý tài sản doanh nghiệp;<br />
						3. Trong thời hạn 07 ngày làm việc kể từ ngày thông qua, quyết định giải thể phải được gửi đến Cơ quan đăng ký kinh doanh, cơ quan thuế, người lao động trong doanh nghiệp. Quyết định giải thể phải được đăng trên cổng thông tin quốc gia về đăng ký doanh nghiệp và được niêm yết công khai tại trụ sở chính, chi nhánh, văn phòng đại diện của doanh nghiệp. Trường hợp doanh nghiệp còn nghĩa vụ tài chính chưa thanh toán thì phải gửi kèm theo quyết định giải thể và phương án giải quyết nợ đến các chủ nợ, người có quyền, nghĩa vụ và lợi ích có liên quan. Phương án giải quyết nợ phải có tên, địa chỉ của chủ nợ; số nợ, thời hạn, địa điểm và phương thức thanh toán số nợ đó; cách thức và thời hạn giải quyết khiếu nại của chủ nợ;<br />
						4. Các khoản nợ của doanh nghiệp được thanh toán theo thứ tự ưu tiên sau đây:<br />
						a) Các khoản nợ lương, trợ cấp thôi việc, bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp theo quy định của pháp luật và các quyền lợi khác của người lao động theo thỏa ước lao động tập thể và hợp đồng lao động đã ký kết;<br />
						b) Nợ thuế;<br />
						c) Các khoản nợ khác;<br />
						5. Sau khi đã thanh toán chi phí giải thể doanh nghiệp và các khoản nợ, phần còn lại thuộc về chủ sở hữu;<br />
						6. Người đại diện theo pháp luật của doanh nghiệp gửi hồ sơ giải thể doanh nghiệp cho Cơ quan đăng ký kinh doanh trong thời hạn 05 ngày làm việc kể từ ngày thanh toán hết các khoản nợ của doanh nghiệp.<br />
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>Chương VI<br /></Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='center'>
					<Typography.Text strong>
						HIỆU LỰC THỰC HIỆN
					</Typography.Text>
				</Col>
			</Row>
			<Row>
				<Col span={24} align='left'>
					<Typography.Text strong>
						Điều 19. Hiệu lực của Điều lệ
					</Typography.Text><br />
					<Typography>
						Điều lệ này có hiệu lực kể từ ngày được Cơ quan đăng ký kinh doanh cấp Giấy chứng nhận đăng ký doanh nghiệp.<br />
					</Typography>
					<br />
					<Typography.Text strong>
						Điều 20.  Thể thức sửa đổi, bổ sung các điều, khoản của Điều lệ
					</Typography.Text><br />
					<Typography>
						1. Những vấn đề liên quan đến hoạt động của Công ty không được nêu trong Bản Điều lệ này sẽ do Luật doanh nghiệp và các văn bản pháp luật liên quan khác điều chỉnh.<br />
						2. Khi muốn bổ sung, sửa đổi nội dung Điều lệ này, Chủ Sở hữu công ty sẽ xem xét, quyết định theo tình hình thực tế.<br />
					</Typography>
					<br />
					<Typography.Text strong>
						Điều 21. Điều khoản cuối cùng
					</Typography.Text><br />
					<Typography.Paragraph>
						1. Những vấn đề liên quan đến hoạt động của Công ty không được nêu trong Bản Điều lệ này sẽ do Luật Doanh nghiệp và các văn bản pháp luật liên quan khác điều chỉnh.<br />
						2. Trong trường hợp điều lệ này có điều khoản trái pháp luật hoặc dẫn đến việc thi hành trái pháp luật, thì điều khoản đó không được thi hành và sẽ được Chủ sở hữu công ty xem xét sửa đổi.<br />
						3. Khi muốn sửa đổi, bổ sung nội dung của Điều lệ này, chủ sở hữu công ty sẽ quyết định.<br />
						Bản điều lệ này đã được chủ sở hữu công ty xem xét từng chương, từng điều và ký tên.<br />
						Bản điều lệ này gồm  6 chương  21 điều, được lập thành 03 bản có giá trị như nhau: 01 bản đăng ký tại cơ quan đăng ký kinh doanh, 01 bản lưu trữ tại trụ sở công ty,  chủ sở hữu giữ 01 bản.<br />
						Mọi sự sao chép, trích lục phải được ký xác nhận của chủ sở hữu công ty.<br />
					</Typography.Paragraph>

				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Row>
						<Col span={6} align="center">
							<Typography.Text>
								<Typography.Text strong></Typography.Text> <br />
								<Typography.Text italic></Typography.Text>
							</Typography.Text>
						</Col>
						<Col span={18} align="center">
							<Typography.Text>
								<Typography.Text italic>  Thành phố Hồ Chí Minh, ngày ... tháng... năm...  </Typography.Text> <br />
								<Typography.Text>Họ, tên, chữ ký người đại diện theo pháp luật của Chủ sở hữu công ty</Typography.Text>

								{/**Ở ĐÂY CÓ KHOẢNG TRỐNG ĐỀ KÝ VÀ GHI HỌ TÊN */}
							</Typography.Text>
						</Col>
					</Row>
				</Col>
			</Row>
		</div >
	);
});

export default File1B;
