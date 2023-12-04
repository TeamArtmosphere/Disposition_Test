export const FlexBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '1920px',
  m: '0 auto',
};
export const FlexBoxCol = { ...FlexBox, flexDirection: 'column' };
export const FlexContainer = { ...FlexBox, width: '100%', height: '100%' };
export const FlexContainerCol = { ...FlexBoxCol, width: '100%', height: '100%' };
export const ButtonBox = { ...FlexContainerCol, gap: '10px', width: '100%' };

export const questionStyle = {
  containerBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  questionContentBox: { height: '62px', wordBreak: 'keep-all', mb: '42px' },
  buttonOnDesktop: {
    width: '275px',
    height: '120px',
    border: '1px solid #EDF0F3',
    fontSize: '36px',
    color: 'black',
  },
  buttonOnMobile: {
    width: '99px',
    height: '48px',
    border: '1px solid #EDF0F3',
    fontSize: '14px',
    color: 'black',
  },
  buttonGetResult: {
    width: '99px',
    height: '48px',
    fontSize: '14px',
  },
};
