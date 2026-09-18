// Original C4 fixture: first 10 sentences, unchanged.
window.C4_SAMPLE = {
  "schema": "hackathon-loi-doc/1",
  "id": "d1-2",
  "tieuDe": "Mô hình ngôn ngữ lớn sinh văn bản như thế nào",
  "mucTieu": "Giải thích cách mô hình tách chữ thành token rồi lần lượt dự đoán từ tiếp theo.",
  "fps": 30,
  "tongSoFrame": 7847,
  "tongGiay": 261.567,
  "ghiChuMocTu": "mocTu là danh sách [viTriKyTu, frame]. viTriKyTu là chỉ số ký tự trong \"chuoiMocTu\"; frame tính từ đầu câu này (30 frame = 1 giây). chuoiMocTu gần như luôn trùng \"loi\" — chỉ khác ở vài câu có thuật ngữ được ghi lại cách đọc cho máy.",
  "phan": [
    {
      "so": 1,
      "ten": "Mở đầu — chữ xuất hiện từ đâu"
    },
    {
      "so": 2,
      "ten": "Token — đơn vị mô hình xử lý"
    },
    {
      "so": 3,
      "ten": "Dự đoán, chọn, nối rồi lặp"
    },
    {
      "so": 4,
      "ten": "Một đầu vào, nhiều cách diễn đạt"
    },
    {
      "so": 5,
      "ten": "Vì sao câu trôi chảy vẫn có thể sai"
    },
    {
      "so": 6,
      "ten": "Câu hỏi và kết luận"
    }
  ],
  "cau": [
    {
      "n": 1,
      "phan": 1,
      "loi": "Khi một trợ lý hội thoại trả lời, các bạn thường thấy chữ xuất hiện dần trên màn hình.",
      "batDauFrame": 0,
      "ketThucFrame": 169,
      "soFrame": 169,
      "soFrameCoTieng": 127,
      "batDau": "00:00.0",
      "ketThuc": "00:05.6",
      "chuoiMocTu": "Khi một trợ lý hội thoại trả lời, các bạn thường thấy chữ xuất hiện dần trên màn hình.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          4,
          5
        ],
        [
          8,
          9
        ],
        [
          12,
          16
        ],
        [
          15,
          21
        ],
        [
          19,
          26
        ],
        [
          25,
          32
        ],
        [
          29,
          37
        ],
        [
          34,
          61
        ],
        [
          38,
          66
        ],
        [
          42,
          71
        ],
        [
          49,
          78
        ],
        [
          54,
          83
        ],
        [
          58,
          91
        ],
        [
          63,
          95
        ],
        [
          68,
          101
        ],
        [
          72,
          108
        ],
        [
          77,
          114
        ],
        [
          81,
          118
        ]
      ]
    },
    {
      "n": 2,
      "phan": 1,
      "loi": "Trong bài này, mình xét cách mô hình tạo từng mảnh văn bản rồi dùng phần vừa có để viết tiếp.",
      "batDauFrame": 169,
      "ketThucFrame": 365,
      "soFrame": 196,
      "soFrameCoTieng": 154,
      "batDau": "00:05.6",
      "ketThuc": "00:12.2",
      "chuoiMocTu": "Trong bài này, mình xét cách mô hình tạo từng mảnh văn bản rồi dùng phần vừa có để viết tiếp.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          6,
          6
        ],
        [
          10,
          11
        ],
        [
          15,
          28
        ],
        [
          20,
          34
        ],
        [
          24,
          40
        ],
        [
          29,
          46
        ],
        [
          32,
          51
        ],
        [
          37,
          57
        ],
        [
          41,
          61
        ],
        [
          46,
          67
        ],
        [
          51,
          73
        ],
        [
          55,
          78
        ],
        [
          59,
          96
        ],
        [
          63,
          104
        ],
        [
          68,
          110
        ],
        [
          73,
          116
        ],
        [
          77,
          123
        ],
        [
          80,
          133
        ],
        [
          83,
          137
        ],
        [
          88,
          143
        ]
      ]
    },
    {
      "n": 3,
      "phan": 1,
      "loi": "Hãy nhìn câu chưa hoàn thành trên màn hình: tôi mang ô vì trời.",
      "batDauFrame": 365,
      "ketThucFrame": 502,
      "soFrame": 137,
      "soFrameCoTieng": 95,
      "batDau": "00:12.2",
      "ketThuc": "00:16.7",
      "chuoiMocTu": "Hãy nhìn câu chưa hoàn thành trên màn hình: tôi mang ô vì trời.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          4,
          5
        ],
        [
          9,
          11
        ],
        [
          13,
          17
        ],
        [
          18,
          23
        ],
        [
          23,
          28
        ],
        [
          29,
          34
        ],
        [
          34,
          39
        ],
        [
          38,
          44
        ],
        [
          44,
          62
        ],
        [
          48,
          69
        ],
        [
          53,
          76
        ],
        [
          55,
          78
        ],
        [
          58,
          83
        ]
      ]
    },
    {
      "n": 4,
      "phan": 1,
      "loi": "Điều cần hiểu cuối video là mô hình chọn mảnh tiếp theo như thế nào và vì sao câu nghe hợp lý vẫn có thể sai.",
      "batDauFrame": 502,
      "ketThucFrame": 724,
      "soFrame": 222,
      "soFrameCoTieng": 162,
      "batDau": "00:16.7",
      "ketThuc": "00:24.1",
      "chuoiMocTu": "Điều cần hiểu cuối video là mô hình chọn mảnh tiếp theo như thế nào và vì sao câu nghe hợp lý vẫn có thể sai.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          5,
          6
        ],
        [
          9,
          11
        ],
        [
          14,
          16
        ],
        [
          19,
          24
        ],
        [
          25,
          35
        ],
        [
          28,
          39
        ],
        [
          31,
          44
        ],
        [
          36,
          48
        ],
        [
          41,
          54
        ],
        [
          46,
          65
        ],
        [
          51,
          72
        ],
        [
          56,
          80
        ],
        [
          60,
          85
        ],
        [
          64,
          89
        ],
        [
          68,
          97
        ],
        [
          71,
          101
        ],
        [
          74,
          106
        ],
        [
          78,
          114
        ],
        [
          82,
          119
        ],
        [
          87,
          124
        ],
        [
          91,
          131
        ],
        [
          94,
          136
        ],
        [
          98,
          140
        ],
        [
          101,
          144
        ],
        [
          105,
          149
        ]
      ]
    },
    {
      "n": 5,
      "phan": 2,
      "loi": "Trước tiên, văn bản được chia thành những mảnh nhỏ để xử lý, gọi là token.",
      "batDauFrame": 724,
      "ketThucFrame": 896,
      "soFrame": 172,
      "soFrameCoTieng": 130,
      "batDau": "00:24.1",
      "ketThuc": "00:29.9",
      "chuoiMocTu": "Trước tiên, văn bản được chia thành những mảnh nhỏ để xử lý, gọi là tô-ken.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          6,
          7
        ],
        [
          12,
          27
        ],
        [
          16,
          32
        ],
        [
          20,
          38
        ],
        [
          25,
          43
        ],
        [
          30,
          49
        ],
        [
          36,
          54
        ],
        [
          42,
          61
        ],
        [
          47,
          66
        ],
        [
          51,
          74
        ],
        [
          54,
          77
        ],
        [
          57,
          82
        ],
        [
          61,
          101
        ],
        [
          65,
          107
        ],
        [
          68,
          112
        ]
      ]
    },
    {
      "n": 6,
      "phan": 2,
      "loi": "Một mảnh có thể là cả một từ, chỉ một phần của từ hoặc một dấu câu, tùy cách chia của mô hình.",
      "batDauFrame": 896,
      "ketThucFrame": 1112,
      "soFrame": 216,
      "soFrameCoTieng": 174,
      "batDau": "00:29.9",
      "ketThuc": "00:37.1",
      "chuoiMocTu": "Một mảnh có thể là cả một từ, chỉ một phần của từ hoặc một dấu câu, tùy cách chia của mô hình.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          4,
          7
        ],
        [
          9,
          12
        ],
        [
          12,
          16
        ],
        [
          16,
          20
        ],
        [
          19,
          23
        ],
        [
          22,
          28
        ],
        [
          26,
          33
        ],
        [
          30,
          57
        ],
        [
          34,
          62
        ],
        [
          38,
          66
        ],
        [
          43,
          72
        ],
        [
          47,
          77
        ],
        [
          50,
          93
        ],
        [
          55,
          103
        ],
        [
          59,
          109
        ],
        [
          63,
          115
        ],
        [
          68,
          136
        ],
        [
          72,
          141
        ],
        [
          77,
          146
        ],
        [
          82,
          152
        ],
        [
          86,
          157
        ],
        [
          89,
          163
        ]
      ]
    },
    {
      "n": 7,
      "phan": 2,
      "loi": "Tên gọi mảnh văn bản giúp mình dễ hình dung, còn token được chia ở đâu là do bộ tách quyết định.",
      "batDauFrame": 1112,
      "ketThucFrame": 1321,
      "soFrame": 209,
      "soFrameCoTieng": 167,
      "batDau": "00:37.1",
      "ketThuc": "00:44.0",
      "chuoiMocTu": "Tên gọi mảnh văn bản giúp mình dễ hình dung, còn tô-ken được chia ở đâu là do bộ tách quyết định.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          4,
          6
        ],
        [
          8,
          11
        ],
        [
          13,
          17
        ],
        [
          17,
          22
        ],
        [
          21,
          37
        ],
        [
          26,
          45
        ],
        [
          31,
          49
        ],
        [
          34,
          53
        ],
        [
          39,
          59
        ],
        [
          45,
          79
        ],
        [
          49,
          85
        ],
        [
          56,
          97
        ],
        [
          61,
          102
        ],
        [
          66,
          111
        ],
        [
          68,
          115
        ],
        [
          72,
          132
        ],
        [
          75,
          138
        ],
        [
          78,
          144
        ],
        [
          81,
          149
        ],
        [
          86,
          154
        ],
        [
          92,
          160
        ]
      ]
    },
    {
      "n": 8,
      "phan": 2,
      "loi": "Đặc biệt với tiếng Việt, các bạn không nên đếm khoảng trắng rồi mặc định mỗi tiếng là đúng một token.",
      "batDauFrame": 1321,
      "ketThucFrame": 1514,
      "soFrame": 193,
      "soFrameCoTieng": 151,
      "batDau": "00:44.0",
      "ketThuc": "00:50.5",
      "chuoiMocTu": "Đặc biệt với tiếng Việt, các bạn không nên đếm khoảng trắng rồi mặc định mỗi tiếng là đúng một tô-ken.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          4,
          6
        ],
        [
          9,
          14
        ],
        [
          13,
          18
        ],
        [
          19,
          24
        ],
        [
          25,
          43
        ],
        [
          29,
          47
        ],
        [
          33,
          53
        ],
        [
          39,
          60
        ],
        [
          43,
          66
        ],
        [
          47,
          72
        ],
        [
          54,
          78
        ],
        [
          60,
          86
        ],
        [
          64,
          90
        ],
        [
          68,
          95
        ],
        [
          73,
          100
        ],
        [
          77,
          107
        ],
        [
          83,
          116
        ],
        [
          86,
          119
        ],
        [
          91,
          125
        ],
        [
          95,
          130
        ]
      ]
    },
    {
      "n": 9,
      "phan": 2,
      "loi": "Mỗi mảnh được chuyển thành mã số, rồi thành một dãy số để mô hình thực hiện phép tính.",
      "batDauFrame": 1514,
      "ketThucFrame": 1708,
      "soFrame": 194,
      "soFrameCoTieng": 152,
      "batDau": "00:50.5",
      "ketThuc": "00:56.9",
      "chuoiMocTu": "Mỗi mảnh được chuyển thành mã số, rồi thành một dãy số để mô hình thực hiện phép tính.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          4,
          8
        ],
        [
          9,
          28
        ],
        [
          14,
          34
        ],
        [
          21,
          40
        ],
        [
          27,
          45
        ],
        [
          30,
          50
        ],
        [
          34,
          71
        ],
        [
          38,
          77
        ],
        [
          44,
          82
        ],
        [
          48,
          87
        ],
        [
          52,
          92
        ],
        [
          55,
          109
        ],
        [
          58,
          117
        ],
        [
          61,
          123
        ],
        [
          66,
          126
        ],
        [
          71,
          130
        ],
        [
          76,
          136
        ],
        [
          81,
          141
        ]
      ]
    },
    {
      "n": 10,
      "phan": 2,
      "loi": "Qua nhiều bước tính toán, những dãy số này kết hợp thông tin từ phần văn bản mà mô hình được phép dùng.",
      "batDauFrame": 1708,
      "ketThucFrame": 1911,
      "soFrame": 203,
      "soFrameCoTieng": 161,
      "batDau": "00:56.9",
      "ketThuc": "01:03.7",
      "chuoiMocTu": "Qua nhiều bước tính toán, những dãy số này kết hợp thông tin từ phần văn bản mà mô hình được phép dùng.",
      "mocTu": [
        [
          0,
          0
        ],
        [
          4,
          5
        ],
        [
          10,
          12
        ],
        [
          15,
          18
        ],
        [
          20,
          24
        ],
        [
          26,
          43
        ],
        [
          32,
          49
        ],
        [
          36,
          54
        ],
        [
          39,
          60
        ],
        [
          43,
          66
        ],
        [
          47,
          71
        ],
        [
          51,
          76
        ],
        [
          57,
          83
        ],
        [
          61,
          89
        ],
        [
          64,
          94
        ],
        [
          69,
          100
        ],
        [
          73,
          105
        ],
        [
          77,
          124
        ],
        [
          80,
          130
        ],
        [
          83,
          136
        ],
        [
          88,
          141
        ],
        [
          93,
          145
        ],
        [
          98,
          150
        ]
      ]
    }
  ]
};
