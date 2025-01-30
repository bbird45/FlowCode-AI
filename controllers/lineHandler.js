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
        const flexMessage = { 
            type: 'flex', 
            altText: 'ความหมายผังงาน',
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
        };
  
        // สร้างรายการรูปภาพทั้งหมด
        const imageMessages = Flowchart
            .filter(flow => flow.flow_url)  // กรองเฉพาะที่มี URL
            .map(flow => ({
                type: 'image',
                originalContentUrl: flow.flow_url,
                previewImageUrl: flow.flow_url
            }));
  
        await client.replyMessage(event.replyToken, [
            flexMessage,
            ...imageMessages // ใช้ Spread Operator เพื่อรวม array ของรูปภาพ
        ]);
  
        return { status: 'Success', response: 'ส่งข้อมูลผังงานและรูปภาพเรียบร้อย' };
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
      const flow = Flowchart[0]; 
      const imageUrls = flow.flow_url.split(',').map(url => url.trim()); 
      const textMessage = {
          type: 'text',
          text: `📌 ${flow.flow_name}\n\n${flow.flow_description}`
      };

      const imageMessages = imageUrls.map(url => ({
          type: 'image',
          originalContentUrl: url,
          previewImageUrl: url
      }));

      await client.replyMessage(event.replyToken, [textMessage, ...imageMessages]);
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
      const flow = Flowchart[0]; 
      const imageUrls = flow.flow_url.split(',').map(url => url.trim());
      const textMessage = {
          type: 'text',
          text: `📌 ${flow.flow_name}\n\n${flow.flow_description}`
      };

      const imageMessages = imageUrls.map(url => ({
          type: 'image',
          originalContentUrl: url,
          previewImageUrl: url
      }));

      await client.replyMessage(event.replyToken, [textMessage, ...imageMessages]);
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
      const flow = Flowchart[0]; 
      const imageUrls = flow.flow_url.split(',').map(url => url.trim());
      const textMessage = {
          type: 'text',
          text: `📌 ${flow.flow_name}\n\n${flow.flow_description}`
      };

      const imageMessages = imageUrls.map(url => ({
          type: 'image',
          originalContentUrl: url,
          previewImageUrl: url
      }));

      await client.replyMessage(event.replyToken, [textMessage, ...imageMessages]);
      return { status: 'Success', response: flow.flow_name };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId13') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 13);

  if (Flowchart.length > 0) {
      const flow = Flowchart[0]; 
      const imageUrls = flow.flow_url.split(',').map(url => url.trim()); 
      const textMessage = {
          type: 'text',
          text: `📌 ${flow.flow_name}\n\n${flow.flow_description}`
      };

      const imageMessages = imageUrls.map(url => ({
          type: 'image',
          originalContentUrl: url,
          previewImageUrl: url
      }));

      await client.replyMessage(event.replyToken, [textMessage, ...imageMessages]);
      return { status: 'Success', response: flow.flow_name };
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
        const flow = Flowchart[0]; 
  
        await client.replyMessage(event.replyToken, {
            type: 'flex',
            altText: 'ตัวอย่างการวิเคราะห์ปัญหาและเขียนผังงาน',
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

if (matchedIntent.intent_name === 'flowId18') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 18);

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

if (matchedIntent.intent_name === 'flowId19') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 19);

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

if (matchedIntent.intent_name === 'flowId20') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 20);

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

if (matchedIntent.intent_name === 'flowId21') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 21);

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

if (matchedIntent.intent_name === 'flowId22') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 22);

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

if (matchedIntent.intent_name === 'flowId23') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 23);

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

if (matchedIntent.intent_name === 'flowId24') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 24);

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

if (matchedIntent.intent_name === 'flowId25') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 25);

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

if (matchedIntent.intent_name === 'flowId26') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 26);

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

if (matchedIntent.intent_name === 'flowId27') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 27);

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

if (matchedIntent.intent_name === 'flowId28') {  
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 28);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_description}`
      ).join('\n\n');

      const messages = {
          type: 'text',
          text: flowchartList
      };

      await client.replyMessage(event.replyToken, messages);
      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId29') {  
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 29);

  if (Flowchart.length > 0) {
      const flowchartList = Flowchart.map(flow => 
          `${flow.flow_description}`
      ).join('\n\n');

      const messages = {
          type: 'text',
          text: flowchartList
      };

      await client.replyMessage(event.replyToken, messages);
      return { status: 'Success', response: flowchartList };
  } else {
      await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
      return { status: 'No' };
  }
}

if (matchedIntent.intent_name === 'flowId30') {
  const flowchart = await getflowchartFromDB();
  const Flowchart = flowchart.filter(flow => flow.flow_id && flow.flow_id === 30);

  if (Flowchart.length > 0) {
      const flow = Flowchart[0]; 
      const imageUrls = flow.flow_url.split(',').map(url => url.trim()); 
      const textMessage = {
          type: 'text',
          text: `📌 ${flow.flow_name}\n\n${flow.flow_description}`
      };

      const imageMessages = imageUrls.map(url => ({
          type: 'image',
          originalContentUrl: url,
          previewImageUrl: url
      }));

      await client.replyMessage(event.replyToken, [textMessage, ...imageMessages]);
      return { status: 'Success', response: flow.flow_name };
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

if (matchedIntent.intent_name === 'pseudoId2') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 2);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId3') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 3);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId4') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 4);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId5') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 5);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId6') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 6);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId7') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 7);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId8') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 8);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId9') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 9);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId10') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 10);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId11') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 11);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId12') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 12);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId13') {
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 13);

    if (Pseudocode.length > 0) {
        const pseudo = Pseudocode[0]; 

        await client.replyMessage(event.replyToken, {
            type: 'flex',
            altText: 'การทำซ้ำหรือการวนรอบ',
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
                                uri: pseudo.Pseudo_URL 
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

if (matchedIntent.intent_name === 'pseudoId14') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 14);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId15') {
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 15);
    
    if (Pseudocode.length > 0) {
        const pseudo = Pseudocode[0]; 
    
        await client.replyMessage(event.replyToken, {
            type: 'flex',
            altText: 'ตัวอย่างการเขียนรหัสเทียม',
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
                                uri: pseudo.Pseudo_URL 
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

if (matchedIntent.intent_name === 'pseudoId16') {
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 16);
    
    if (Pseudocode.length > 0) {
        const pseudo = Pseudocode[0]; 
    
        await client.replyMessage(event.replyToken, {
            type: 'flex',
            altText: 'สรุปรหัสเทียม',
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
                                uri: pseudo.Pseudo_URL 
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

if (matchedIntent.intent_name === 'pseudoId17') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 17);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_description}`
        ).join('\n\n');

        const messages = {
            type: 'text',
            text: pseudocodeList
        };

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId18') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 18);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_description}`
        ).join('\n\n');

        const messages = {
            type: 'text',
            text: pseudocodeList
        };

        await client.replyMessage(event.replyToken, messages);
        return { status: 'Success', response: pseudocodeList };
        } else {
            await client.replyMessage(event.replyToken, { type: 'text', text: 'ไม่พบข้อมูล' });
        return { status: 'No' };
    }
}

if (matchedIntent.intent_name === 'pseudoId19') {  
    const pseudocode = await getPseudocodeFromDB();
    const Pseudocode = pseudocode.filter(pseudo => pseudo.Pseudo_id && pseudo.Pseudo_id === 19);

    if (Pseudocode.length > 0) {
        const pseudocodeList = Pseudocode.map(pseudo => 
            `${pseudo.Pseudo_name}\n\n${pseudo.Pseudo_description}`
        ).join('\n\n');

        const pseudoImages = Pseudocode.map(pseudo => {
            const urls = pseudo.Pseudo_URL.split(',');  
            return urls.map(url => ({
                type: 'image',
                originalContentUrl: url.trim(), 
                previewImageUrl: url.trim() 
            }));
        }).flat(); 
        const messages = [
            { type: 'text', text: pseudocodeList }, 
            ...pseudoImages 
        ];

        await client.replyMessage(event.replyToken, messages);
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
          const messageText = `✨ คำถามที่พบบ่อย \n"ผังงานคืออะไร"\n"ผังงานมีกี่ประเภท"\n"ประโยชน์ของผังงานคือ"\n"หลักการเขียนผังงานที่ดี"\n"ข้อจำกัดของผังงาน"\n"รหัสเทียมคืออะไร"\n"ประโยชน์ของรหัสเทียมคือ"\n"หลักการเขียนรหัสเทียมที่ดี"\n"คำสั่งพื้นฐานรหัสเทียมคือ"\n\nนี้คือคำถามเบื้องต้นที่พบบ่อย`;
          await client.replyMessage(event.replyToken, { type: 'text', text: messageText });
          return { status: 'Success', response: messageText };
      }

//-------------------------------------------------------------------------------------------------------------
if (matchedIntent.intent_name === 'คำแนะนำ') {
const messageText = `✨ คำแนะนำ
🔍พิมพ์ค้นหาอย่างไร? นี้คือตัวอย่างการพิมพ์คำค้นหา\n
🔍ค้นหารหัสเทียม\n"พิมพ์ว่า รหัสเทียม"\n🔍ค้นหาประโยชน์ของรหัสเทียม\n "พิมพ์ว่า ประโยชน์รหัสเทียม"\n🔍ค้นหาตัวอย่างรหัสเทียม\n "พิมพ์ว่า ตัวอย่างรหัสเทียม"\n🔍ต้องการค้นหาผังงาน\n "พิมพ์ว่า ผังงาน"\n🔍ค้นหาประโยชน์ของผังงาน\n "พิมพ์ว่า ประโยชน์ผังงาน"\n🔍ค้นหาสัญลักษณ์ในผังงาน\n "พิมพ์ว่า สัญลักษณ์ผังงาน"\n
นี้คือการค้นหาเบื้องต้นที่พบบ่อย `;
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
