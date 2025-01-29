const { client } = require('../config/config');
const stringSimilarity = require('string-similarity');
const { getflowchartFromDB } = require('../database/database');
const { getPseudocodeFromDB } = require('../database/database');
const { getQuizFromDB } = require('../database/database');
const { getadminFromDB } = require('../database/database');

// ฟังก์ชันจัดการกับ event ที่ได้รับจาก LINE
async function handleEvent(event, intentsData) {
  try {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return null;
    }

    const userMessage = event.message.text;

    if (!intentsData || intentsData.length === 0) {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ขออภัย ไม่พบข้อมูลคำตอบในขณะนี้' });
      return { status: 'No data' };
    }

    const trainingPhrases = intentsData.flatMap(intent => intent.training_phrases);

    const bestMatch = stringSimilarity.findBestMatch(userMessage, trainingPhrases).bestMatch;

    if (bestMatch.rating > 0.5) {
      const matchedIntent = intentsData.find(intent => 
        intent.training_phrases.includes(bestMatch.target)
      );
    
//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId1') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 1);

  if (Flowchart.length > 0) {
      const flow = Flowchart[0]; 

      await client.replyMessage(event.replyToken, {
          type: 'flex',
          altText: 'เนื้อหาผังงาน',
          contents: {
              type: 'bubble',
              body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                      {
                          type: 'text',
                          text: `${flow.flow_name}`,
                          weight: 'bold',
                          size: 'lg'
                      },
                      {
                          type: 'text',
                          text: `${flow.flow_description}`,
                          size: 'md',
                          wrap: true
                      }
                  ]
              },
              footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                      {
                          type: 'button',
                          action: {
                              type: 'uri',
                              label: 'ข้อมูลเพิ่มเติม',
                              uri: flow.flow_url 
                          },
                          height: 'sm'
                      }
                  ]
              }
          }
      });

      return { status: 'Success', response: 'Flex Message Sent' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}
      
if (matchedIntent.intent_name === 'flowId2') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 2);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      await client.replyMessage(event.replyToken, [
          { 
              type: 'flex', 
              altText: 'ข้อมูลความหมายผังงาน',
              contents: {
                  type: 'bubble',
                  body: {
                      type: 'box',
                      layout: 'vertical',
                      contents: Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_name,
                          weight: 'bold', 
                          size: 'lg'
                      })).concat(Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_description,
                          size: 'md',
                          wrap: true
                      })))
                  }
              }
          },
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, 
              previewImageUrl: Flowchart[0].flow_url 
          }
      ]);

      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId3') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 3);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      await client.replyMessage(event.replyToken, [
          { 
              type: 'flex', 
              altText: 'ข้อมูลผังงานระบบ',
              contents: {
                  type: 'bubble',
                  body: {
                      type: 'box',
                      layout: 'vertical',
                      contents: Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_name,
                          weight: 'bold', 
                          size: 'lg'
                      })).concat(Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_description,
                          size: 'md',
                          wrap: true
                      })))
                  }
              }
          },
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, 
              previewImageUrl: Flowchart[0].flow_url 
          }
      ]);

      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId4') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 4);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      await client.replyMessage(event.replyToken, [
          { 
              type: 'flex', 
              altText: 'ข้อมูลผังงานโปรแกรม',
              contents: {
                  type: 'bubble',
                  body: {
                      type: 'box',
                      layout: 'vertical',
                      contents: Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_name,
                          weight: 'bold', 
                          size: 'lg'
                      })).concat(Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_description,
                          size: 'md',
                          wrap: true
                      })))
                  }
              }
          },
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, 
              previewImageUrl: Flowchart[0].flow_url 
          }
      ]);

      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId5') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 5);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      await client.replyMessage(event.replyToken, [
          { type: 'text', text: flowchartList }, 
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, 
              previewImageUrl: Flowchart[0].flow_url 
          }
      ]);

      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId6') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 6);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      await client.replyMessage(event.replyToken, [
          { 
              type: 'flex', 
              altText: 'ข้อมูลประโยชน์ของผังงาน',
              contents: {
                  type: 'bubble',
                  body: {
                      type: 'box',
                      layout: 'vertical',
                      contents: Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_name,
                          weight: 'bold', 
                          size: 'lg'
                      })).concat(Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_description,
                          size: 'md',
                          wrap: true
                      })))
                  }
              }
          },
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, 
              previewImageUrl: Flowchart[0].flow_url 
          }
      ]);

      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId7') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 7);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      await client.replyMessage(event.replyToken, [
          { 
              type: 'flex', 
              altText: 'ข้อมูลการเขียนผังงานที่ดี',
              contents: {
                  type: 'bubble',
                  body: {
                      type: 'box',
                      layout: 'vertical',
                      contents: Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_name,
                          weight: 'bold', 
                          size: 'lg'
                      })).concat(Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_description,
                          size: 'md',
                          wrap: true
                      })))
                  }
              }
          },
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, 
              previewImageUrl: Flowchart[0].flow_url 
          }
      ]);

      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId8') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 8);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      await client.replyMessage(event.replyToken, [
          { 
              type: 'flex', 
              altText: 'ข้อมูลข้อจำกัดของผังงาน',
              contents: {
                  type: 'bubble',
                  body: {
                      type: 'box',
                      layout: 'vertical',
                      contents: Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_name,
                          weight: 'bold', 
                          size: 'lg'
                      })).concat(Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_description,
                          size: 'md',
                          wrap: true
                      })))
                  }
              }
          },
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, 
              previewImageUrl: Flowchart[0].flow_url 
          }
      ]);

      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId9') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 9);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      await client.replyMessage(event.replyToken, [
          { 
              type: 'flex', 
              altText: 'ข้อมูลหลักในการเขียนผังงาน',
              contents: {
                  type: 'bubble',
                  body: {
                      type: 'box',
                      layout: 'vertical',
                      contents: Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_name,
                          weight: 'bold', 
                          size: 'lg'
                      })).concat(Flowchart.map(flow => ({
                          type: 'text',
                          text: flow.flow_description,
                          size: 'md',
                          wrap: true
                      })))
                  }
              }
          },
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, 
              previewImageUrl: Flowchart[0].flow_url 
          }
      ]);

      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId10') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 10);

  if (Flowchart.length > 0) {
      const flow = Flowchart[0]; // เอาเฉพาะข้อมูลตัวแรกมาใช้
      const imageUrls = flow.flow_url.split(',').map(url => url.trim()); // แยก URL ของรูป

      // สร้าง Flex Message (bubble เดียว)
      const flexMessage = {
          type: 'bubble',
          body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                  {
                      type: 'text',
                      text: flow.flow_name, // แสดงชื่อแค่ครั้งเดียว
                      weight: 'bold',
                      size: 'lg'
                  },
                  {
                      type: 'text',
                      text: flow.flow_description, // แสดงคำอธิบายแค่ครั้งเดียว
                      size: 'md',
                      wrap: true
                  },
                  ...imageUrls.map(url => ({
                      type: 'image',
                      url: url,
                      size: 'full',
                      aspectRatio: "16:9",
                      aspectMode: "cover"
                  }))
              ]
          }
      };

      // ส่ง Flex Message
      await client.replyMessage(event.replyToken, [
          { 
              type: 'flex', 
              altText: 'ข้อมูลรูปแบบของผังงาน',
              contents: flexMessage
          }
      ]);

      return { status: 'Success', response: flow.flow_name };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId11') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 11);

  if (Flowchart.length > 0) {
      const flow = Flowchart[0]; // เอาเฉพาะข้อมูลตัวแรกมาใช้
      const imageUrls = flow.flow_url.split(',').map(url => url.trim()); // แยก URL ของรูป

      // สร้าง Flex Message (bubble เดียว)
      const flexMessage = {
          type: 'bubble',
          body: {
              type: 'box',
              layout: 'horizontal',  // ใช้แนวนอน
              contents: [
                  {
                      type: 'box',
                      layout: 'vertical',
                      flex: 2,  // กำหนดให้ส่วนข้อความกว้างกว่า
                      contents: [
                          {
                              type: 'text',
                              text: flow.flow_name, // แสดงชื่อแค่ครั้งเดียว
                              weight: 'bold',
                              size: 'lg',
                              wrap: true
                          },
                          {
                              type: 'text',
                              text: flow.flow_description, // แสดงคำอธิบายแค่ครั้งเดียว
                              size: 'md',
                              wrap: true
                          }
                      ]
                  },
                  {
                      type: 'box',
                      layout: 'vertical',
                      flex: 3,  // กำหนดให้ส่วนรูปภาพกว้างกว่า
                      contents: imageUrls.map(url => ({
                          type: 'image',
                          url: url,
                          size: 'full',
                          aspectRatio: "1:1",
                          aspectMode: "cover"
                      }))
                  }
              ]
          }
      };

      // ส่ง Flex Message
      await client.replyMessage(event.replyToken, [
          { 
              type: 'flex', 
              altText: 'ข้อมูลหลักในการเขียนผังงาน',
              contents: flexMessage
          }
      ]);

      return { status: 'Success', response: flow.flow_name };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}


if (matchedIntent.intent_name === 'flowId12') {  
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 12);

  if (Flowchart.length > 0) {
      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(','); 
          return urls.map(url => ({
              type: 'image',
              originalContentUrl: url.trim(), 
              previewImageUrl: url.trim() 
          }));
      }).flat(); 

      await client.replyMessage(event.replyToken, flowImages);
      return { status: 'Success', response: 'Sent images successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId13') {  
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 13);

  if (Flowchart.length > 0) {
      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(','); 
          return urls.map(url => ({
              type: 'image',
              originalContentUrl: url.trim(), 
              previewImageUrl: url.trim() 
          }));
      }).flat(); 

      await client.replyMessage(event.replyToken, flowImages);
      return { status: 'Success', response: 'Sent images successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId14') {  
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 14);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(',');  
          return urls.map(url => ({
              type: 'image',
              originalContentUrl: url.trim(), 
              previewImageUrl: url.trim() 
          }));
      }).flat(); 
      const messages = [
          { type: 'text', text: flowchartList }, 
          ...flowImages 
      ];

      await client.replyMessage(event.replyToken, messages);
      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId15') {  
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 15);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(',');  
          return urls.map(url => ({
              type: 'image',
              originalContentUrl: url.trim(), 
              previewImageUrl: url.trim() 
          }));
      }).flat(); 
      const messages = [
          { type: 'text', text: flowchartList }, 
          ...flowImages 
      ];

      await client.replyMessage(event.replyToken, messages);
      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId16') {  
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 16);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}\n${flow.flow_description}`
      ).join('\n\n');

      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(',');  
          return urls.map(url => ({
              type: 'image',
              originalContentUrl: url.trim(), 
              previewImageUrl: url.trim() 
          }));
      }).flat(); 
      const messages = [
          { type: 'text', text: flowchartList }, 
          ...flowImages 
      ];

      await client.replyMessage(event.replyToken, messages);
      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId17') {  
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 17);

  if (Flowchart.length > 0) {
      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(',');
          return urls.map(url => ({
              type: 'flex',
              altText: 'ข้อมูลตัวอย่างการวิเคราะห์ปัญหาและเขียนผังงาน',
              contents: {
                  type: 'bubble',
                  body: {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                          {
                              type: 'image',
                              url: url.trim(),
                              size: 'full',
                              aspectRatio: '16:9',
                              aspectMode: 'cover'
                          }
                      ],
                      alignItems: 'end'  // ดันเนื้อหาไปทางขวา
                  }
              }
          }));
      }).flat(); 

      await client.replyMessage(event.replyToken, flowImages);
      return { status: 'Success', response: 'Sent images successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}


//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId18') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 18);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}


//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId19') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 19);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId20') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 20);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}


//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId21') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 21);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId22') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 22);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId23') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 23);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId24') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 24);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId25') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 25);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId26') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 26);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId27') {
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 27);

  if (Flowchart.length > 0) {
      // ส่งข้อความพร้อมภาพโดยไม่ใช้ flowchartList
      await client.replyMessage(event.replyToken, [
          { 
              type: 'image', 
              originalContentUrl: Flowchart[0].flow_url, // URL ของภาพ
              previewImageUrl: Flowchart[0].flow_url // URL ของภาพตัวอย่าง
          }
      ]);

      return { status: 'Success', response: 'Sent image successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId28') {  // ตรวจสอบ intent_name
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 28);

  if (Flowchart.length > 0) {
      // สร้างรายการข้อความ
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}`
      ).join('\n\n');

      // แยก URL ออกเป็นหลายๆ อัน
      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(','); // แยก URL ที่คั่นด้วยเครื่องหมาย , 
          return urls.map(url => ({
              type: 'image',
              originalContentUrl: url.trim(), // URL ของภาพ
              previewImageUrl: url.trim() // URL ของภาพตัวอย่าง
          }));
      }).flat(); // ใช้ .flat() เพื่อให้รวมเป็น array เดียว

      // ส่งข้อความพร้อมภาพหลายภาพ
      const messages = [
          { type: 'text', text: flowchartList }, // ส่งข้อความ
          ...flowImages // ส่งภาพจาก URL ที่แยกออก
      ];

      await client.replyMessage(event.replyToken, messages);
      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId29') {  // ตรวจสอบ intent_name
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 29);

  if (Flowchart.length > 0) {
      // สร้างรายการข้อความ
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}`
      ).join('\n\n');

      // แยก URL ออกเป็นหลายๆ อัน
      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(','); // แยก URL ที่คั่นด้วยเครื่องหมาย , 
          return urls.map(url => ({
              type: 'image',
              originalContentUrl: url.trim(), // URL ของภาพ
              previewImageUrl: url.trim() // URL ของภาพตัวอย่าง
          }));
      }).flat(); // ใช้ .flat() เพื่อให้รวมเป็น array เดียว

      // ส่งข้อความพร้อมภาพหลายภาพ
      const messages = [
          { type: 'text', text: flowchartList }, // ส่งข้อความ
          ...flowImages // ส่งภาพจาก URL ที่แยกออก
      ];

      await client.replyMessage(event.replyToken, messages);
      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId30') {  // ตรวจสอบ intent_name
  const flowchart = await getflowchartFromDB();

  // ฟิลเตอร์หาผังงานระบบ
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 30);

  if (Flowchart.length > 0) {
      // สร้างรายการข้อความ
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_name}`
      ).join('\n\n');

      // แยก URL ออกเป็นหลายๆ อัน
      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(','); // แยก URL ที่คั่นด้วยเครื่องหมาย , 
          return urls.map(url => ({
              type: 'image',
              originalContentUrl: url.trim(), // URL ของภาพ
              previewImageUrl: url.trim() // URL ของภาพตัวอย่าง
          }));
      }).flat(); // ใช้ .flat() เพื่อให้รวมเป็น array เดียว

      // ส่งข้อความพร้อมภาพหลายภาพ
      const messages = [
          { type: 'text', text: flowchartList }, // ส่งข้อความ
          ...flowImages // ส่งภาพจาก URL ที่แยกออก
      ];

      await client.replyMessage(event.replyToken, messages);
      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'flowId456') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id === 14 || flow.flow_id === 15 || flow.flow_id === 16 );

  if (Flowchart.length > 0) {
      // แยก URL ออกเป็นหลายๆ อัน
      const flowImages = Flowchart.map(flow => {
          const urls = flow.flow_url.split(','); // แยก URL ที่คั่นด้วยเครื่องหมาย , 
          return urls.map(url => ({
              type: 'image',
              originalContentUrl: url.trim(), // URL ของภาพ
              previewImageUrl: url.trim() // URL ของภาพตัวอย่าง
          }));
      }).flat(); // ใช้ .flat() เพื่อให้รวมเป็น array เดียว

      // ส่งภาพหลายๆ อัน
      await client.replyMessage(event.replyToken, flowImages);
      return { status: 'Success', response: 'Sent images successfully' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'pseudoId1') {
  const pseudocode = await getPseudocodeFromDB();
  
  // ฟิลเตอร์หาเนื้อหารหัสเทียม
  const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 1);

  if (Pseudocode.length > 0) {
      const pseudo = Pseudocode[0]; // ใช้ข้อมูลตัวแรกที่พบ

      // ส่ง Flex Message
      await client.replyMessage(event.replyToken, {
          type: 'flex',
          altText: 'เนื้อหารหัสเทียม',
          contents: {
              type: 'bubble',
              body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                      {
                          type: 'text',
                          text: `${pseudo.Pseudo_name}`,
                          weight: 'bold',
                          size: 'lg'
                      },
                      {
                          type: 'text',
                          text: `${pseudo.Pseudo_description}`,
                          size: 'md',
                          wrap: true
                      }
                  ]
              },
              footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                      {
                          type: 'button',
                          action: {
                              type: 'uri',
                              label: 'ข้อมูลเพิ่มเติม',
                              uri: pseudo.Pseudo_URL // URL ที่ต้องการ
                          },
                          height: 'sm'
                      }
                  ]
              }
          }
      });

      return { status: 'Success', response: 'Flex Message Sent' };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId2') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาความหมายรหัสเทียม
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 2);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `📄 ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId3') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาคำสั่งรหัสเทียม
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 3);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `💻 ${pseudo.Pseudo_name}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId4') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาประโยชน์ของการเขียนรหัสเทียม
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 4);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `💡 ${pseudo.Pseudo_name}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId5') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาหลักในการเขียนรหัสเทียม
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 5);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `⚖️ ${pseudo.Pseudo_name}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId6') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาพื้นฐานการเขียนรหัสเทียม
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 6);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `📚 ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId7') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาการกำหนดค่า
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 7);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `⚙️ ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId8') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาการคำนวณ
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 8);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `🧮 ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId9') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาการรับข้อมูลเข้า
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 9);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `⌨️ ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId10') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาการแสดงผลข้อมูล
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 10);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `👁️ ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId11') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หากลุ่มของคำสั่ง
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 11);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `📂 ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId12') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาการตัดสินใจทางเลือก
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 12);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `🔀 ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId13') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาการทำซ้ำหรือการวนรอบ
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 13);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `🔄 ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId14') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาการเรียกโปรแกรมย่อยและกระโดดข้าม
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 14);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `➡️ ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId15') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาตัวอย่างการเขียนรหัสเทียม
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 15);

        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `📄 ${pseudo.Pseudo_name}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');

          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId16') {
        const pseudocode = await getPseudocodeFromDB();
        
        // ฟิลเตอร์หาสรุป
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 16);
      
        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `✅ ${pseudo.Pseudo_name}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId17') {
        const pseudocode = await getPseudocodeFromDB();
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 17);
      
        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `${pseudo.Pseudo_description}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId18') {
        const pseudocode = await getPseudocodeFromDB();
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 18);
      
        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `${pseudo.Pseudo_description}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId19') {
        const pseudocode = await getPseudocodeFromDB();
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 19);
      
        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `⚙️ ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId20') {
        const pseudocode = await getPseudocodeFromDB();
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 20);
      
        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `⚙️ ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId21') {
        const pseudocode = await getPseudocodeFromDB();
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 21);
      
        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `⚙️ ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId22') {
        const pseudocode = await getPseudocodeFromDB();
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 22);
      
        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `⚙️ ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'pseudoId23') {
        const pseudocode = await getPseudocodeFromDB();
        const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 23);
      
        if (pseudocode.length > 0) {
          const pseudocodeList = Pseudocode.map(pseudo => 
              `⚙️ ${pseudo.Pseudo_name}\n📖 ${pseudo.Pseudo_description}\n🔗 ${pseudo.Pseudo_URL}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: pseudocodeList });
          return { status: 'Success', response: pseudocodeList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }
      
//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'quiz') {
        const quizion = await getQuizFromDB();
        
        const Quiz = quizion.filter(quiz => quiz.Quiz_id && quiz.Quiz_id);
      
        if (quizion.length > 0) {
          const quizList = Quiz.map(quiz => 
              `📝 ${quiz.Quiz_name}\n🔗 ${quiz.Quiz_link}\n───── ⋆⋅☆⋅⋆ ─────`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: quizList });
          return { status: 'Success', response: quizList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'quizId1') {
        const quizion = await getQuizFromDB();
        
        // ฟิลเตอร์หาแบบทดสอบก่อนเรียนผังงาน โดยตรวจสอบค่า 'Quit_id' ว่าตรงกับ 'แบบทดสอบก่อนเรียนผังงาน'
        const Quiz = quizion.filter(quiz => quiz.Quiz_id && quiz.Quiz_id === 1);
      
        if (quizion.length > 0) {
          const quizList = Quiz.map(quiz => 
              `📝 ${quiz.Quiz_name}\n🔗 ${quiz.Quiz_link}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: quizList });
          return { status: 'Success', response: quizList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'quizId2') {
        const quizion = await getQuizFromDB();
        
        // ฟิลเตอร์หาแบบทดสอบหลังเรียนผังงาน โดยตรวจสอบค่า 'Quit_id' ว่าตรงกับ 'แบบทดสอบหลังเรียนผังงาน'
        const Quiz = quizion.filter(quiz => quiz.Quiz_id && quiz.Quiz_id === 2);
      
        if (quizion.length > 0) {
          const quizList = Quiz.map(quiz => 
              `📝 ${quiz.Quiz_name}\n🔗 ${quiz.Quiz_link}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: quizList });
          return { status: 'Success', response: quizList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'quizId3') {
        const quizion = await getQuizFromDB();
        
        // ฟิลเตอร์หาแบบทดสอบก่อนเรียนรหัสเทียม โดยตรวจสอบค่า 'Quit_id' ว่าตรงกับ 'แบบทดสอบก่อนเรียนรหัสเทียม'
        const Quiz = quizion.filter(quiz => quiz.Quiz_id && quiz.Quiz_id === 3);
      
        if (quizion.length > 0) {
          const quizList = Quiz.map(quiz => 
              `📝 ${quiz.Quiz_name}\n🔗 ${quiz.Quiz_link}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: quizList });
          return { status: 'Success', response: quizList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'quizId4') {
        const quizion = await getQuizFromDB();
        
        // ฟิลเตอร์หาแบบทดสอบหลังเรียนรหัสเทียม โดยตรวจสอบค่า 'Quit_id' ว่าตรงกับ 'แบบทดสอบหลังเรียนรหัสเทียม'
        const Quiz = quizion.filter(quiz => quiz.Quiz_id && quiz.Quiz_id === 4);
      
        if (quizion.length > 0) {
          const quizList = Quiz.map(quiz => 
              `📝 ${quiz.Quiz_name}\n🔗 ${quiz.Quiz_link}`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: quizList });
          return { status: 'Success', response: quizList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'quizId12') {
        const quizion = await getQuizFromDB();
        
        // ฟิลเตอร์หาแบบทดสอบก่อนเรียนผังงานและแบบทดสอบหลังเรียนผังงาน โดยตรวจสอบค่า 'Quit_id' ว่าตรงกับ 'แบบทดสอบก่อนเรียนผังงานและแบบทดสอบหลังเรียนผังงาน'
        const Quiz = quizion.filter(quiz => quiz.Quiz_id === 1 || quiz.Quiz_id === 2 );
      
        if (quizion.length > 0) {
          const quizList = Quiz.map(quiz => 
              `📝 ${quiz.Quiz_name}\n🔗 ${quiz.Quiz_link}\n───── ⋆⋅☆⋅⋆ ─────`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: quizList });
          return { status: 'Success', response: quizList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'quizId34') {
        const quizion = await getQuizFromDB();
        
        // ฟิลเตอร์หาแบบทดสอบก่อนเรียนรหัสเทียมและแบบทดสอบหลังเรียนรหัสเทียม โดยตรวจสอบค่า 'Quit_id' ว่าตรงกับ 'แบบทดสอบก่อนเรียนรหัสเทียมและแบบทดสอบหลังเรียนรหัสเทียม'
        const Quiz = quizion.filter(quiz => quiz.Quiz_id === 3 || quiz.Quiz_id === 4 );
      
        if (quizion.length > 0) {
          const quizList = Quiz.map(quiz => 
              `📝 ${quiz.Quiz_name}\n🔗 ${quiz.Quiz_link}\n───── ⋆⋅☆⋅⋆ ─────`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: quizList });
          return { status: 'Success', response: quizList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'quizId13') {
        const quizion = await getQuizFromDB();
        
        // ฟิลเตอร์หาแบบทดสอบก่อนเรียนผังงานและแบบทดสอบก่อนเรียนรหัสเทียม โดยตรวจสอบค่า 'Quit_id' ว่าตรงกับ 'แบบทดสอบก่อนเรียนผังงานและแบบทดสอบก่อนเรียนรหัสเทียม'
        const Quiz = quizion.filter(quiz => quiz.Quiz_id === 1 || quiz.Quiz_id === 3 );
      
        if (quizion.length > 0) {
          const quizList = Quiz.map(quiz => 
              `📝 ${quiz.Quiz_name}\n🔗 ${quiz.Quiz_link}\n───── ⋆⋅☆⋅⋆ ─────`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: quizList });
          return { status: 'Success', response: quizList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'quizId24') {
        const quizion = await getQuizFromDB();
        
        // ฟิลเตอร์หาแบบทดสอบหลังเรียนผังงานและแบบทดสอบหลังเรียนรหัสเทียม โดยตรวจสอบค่า 'Quit_id' ว่าตรงกับ 'แบบทดสอบหลังเรียนผังงานและแบบทดสอบหลังเรียนรหัสเทียม'
        const Quiz = quizion.filter(quiz => quiz.Quiz_id === 2 || quiz.Quiz_id === 4 );
      
        if (quizion.length > 0) {
          const quizList = Quiz.map(quiz => 
              `📝 ${quiz.Quiz_name}\n🔗 ${quiz.Quiz_link}\n───── ⋆⋅☆⋅⋆ ─────`
          ).join('\n\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: quizList });
          return { status: 'Success', response: quizList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-----------------------------------------------------------------------------------------------------------------------------
      if (matchedIntent.intent_name === 'admin') {
        const admin = await getadminFromDB();
        
        const Admin = admin.filter(ad => ad.admin_id && ad.admin_id === 1);
      
        if (admin.length > 0) {
          const adminList = Admin.map(ad => 
              `📘 ${ad.admin_name}\n🔗 ${ad.admin_url}`
          ).join('\n');
      
          await client.replyMessage(event.replyToken, { type: 'text', text: adminList });
          return { status: 'Success', response: adminList };
        } else {
          await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
          return { status: 'No' };
        }
      }

//-------------------------------------------------------------------------------------------------------------
        if (matchedIntent.intent_name === 'คำถามที่พบบ่อย') {
          const messageText = `✨ คำถามที่พบบ่อย ✨\n📜"ผังงานคืออะไร"\n📖"ผังงานมีกี่ประเภท"\n📝"ประโยชน์ของการเขียนผังงานคือ"\n🖥️"การเขียนผังงานที่ดีควรทำอย่างไร"\n📚"ข้อจำกัดของผังงานคือ"\n📜"รหัสเทียมคืออะไร"\n📖"ประโยชน์ของการเขียนรหัสเทียมคือ"\n🔹"หลักการเขียนรหัสเทียมที่ดีคือ"\n🔄"คำสั่งพื้นฐานรหัสเทียมคือ"\n✨นี่คือคำถามเบื้องต้นที่พบบ่อย ✨`;
          await client.replyMessage(event.replyToken, { type: 'text', text: messageText });
          return { status: 'Success', response: messageText };
      }

//-------------------------------------------------------------------------------------------------------------
        if (matchedIntent.intent_name === 'คำแนะนำ') {
          const messageText = `✨ คำแนะนำ ✨
      🔍พิมพ์ค้นหาอย่างไร? นี้คือตัวอย่างการพิมพ์คำค้นหา 
      ⋆⋅☆⋅⋆
      🔍ต้องการค้นหารหัสเทียมคืออะไร?
      📜"พิมพ์ว่า รหัสเทียม" 
      ⋆⋅☆⋅⋆  
      🔍ต้องการค้นหาประโยชน์ของการเขียนรหัสเทียม
      📖"พิมพ์ว่า ประโยชน์รหัสเทียม"
      ⋆⋅☆⋅⋆
      🔍ต้องการค้นหาหลักการเขียนรหัสเทียม
      📝"พิมพ์ว่า หลักการรหัสเทียม"
      ⋆⋅☆⋅⋆ 
      🔍ต้องการค้นหาตัวอย่างการเขียนรหัสเทียม
      🖥️"พิมพ์ว่า ตัวอย่างรหัสเทียม"
      ⋆⋅☆⋅⋆
      🔍ต้องการค้นหาความหมายรหัสเทียม
      📚"พิมพ์ว่า ความหมายรหัสเทียม"
      ⋆⋅☆⋅⋆ 
      🔍ต้องการค้นหาผังงานคืออะไร?
      📜"พิมพ์ว่า ผังงาน"
      ⋆⋅☆⋅⋆
      🔍ต้องการค้นหาประโยชน์ของผังงาน
      📖"พิมพ์ว่า ประโยชน์ผังงาน"
      ⋆⋅☆⋅⋆
      🔍ต้องการค้นหาสัญลักษณ์ที่ใช้ในผังงาน
      🔹"พิมพ์ว่า สัญลักษณ์ผังงาน"
      ⋆⋅☆⋅⋆
      🔍ต้องการค้นหาตัวอย่างการเขียนผังงาน
      🔄"พิมพ์ว่า ตัวอย่างผังงาน" 
      ⋆⋅☆⋅⋆
      🔍ต้องการค้นหา Start/Terminator คืออะไร
      🚀"พิมพ์ว่า Start หรือ Terminator"
      ⋆⋅☆⋅⋆
      ✨ นี้คือการค้นหาเบื้องต้นที่พบบ่อย ✨`;
          await client.replyMessage(event.replyToken, { type: 'text', text: messageText });
          return { status: 'Success', response: messageText };
      }
      
//-----------------------------------------------------------------------------------------------------------------------------
      const response = matchedIntent.intent_name;
      await client.replyMessage(event.replyToken, { type: 'text', text: response });
      return { status: 'Success', response };
    } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ขออภัย ฉันไม่เข้าใจคำถามของคุณ' });
      return { status: 'No match' };
    }
  } catch (error) {
    console.error('Error handling event:', error);
    throw error;
  }
}



module.exports = {
  handleEvent,
};
