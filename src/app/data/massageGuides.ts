import { MassageGuides } from '../types/types';

export const massageGuides: MassageGuides = {
  deltoid: {
    title: "삼각근 마사지 가이드",
    description: "삼각근은 어깨를 감싸는 큰 근육으로, 자세가 좋지 않을 때 긴장될 수 있습니다.",
    steps: [
      { title: "준비 단계", description: "편안하게 앉아 목과 어깨를 이완시킵니다. 깊게 숨을 쉬며 어깨의 긴장을 풀어줍니다.", duration: 30 },
      { title: "마사지 단계 1", description: "반대쪽 손으로 삼각근을 감싸고 원을 그리며 부드럽게 마사지합니다. 어깨 전체를 골고루 마사지해 주세요.", duration: 240 },
      { title: "마사지 단계 2", description: "손가락 끝으로 삼각근과 승모근이 만나는 지점에 압력을 가합니다. 뭉친 부분을 집중적으로 마사지합니다.", duration: 180 },
      { title: "스트레칭", description: "한쪽 팔을 몸 앞으로 가로질러 반대쪽 어깨 쪽으로 당깁니다. 20초간 유지하고 3회 반복합니다.", duration: 60 }
    ]
  },
  biceps: {
    title: "이두박근 마사지 가이드",
    description: "이두박근은 팔꿈치를 굽히는 주요 근육으로, 장시간 컴퓨터 사용 시 긴장될 수 있습니다.",
    steps: [
      { title: "준비 단계", description: "편안한 자세로 앉거나 서서 팔을 이완시킵니다. 팔 근육에 긴장을 풀고 호흡을 깊게 합니다.", duration: 30 },
      { title: "마사지 단계 1", description: "반대쪽 손으로 이두박근을 감싸고 아래에서 위로 부드럽게 문지릅니다. 5분간 천천히 압력을 가하며 진행합니다.", duration: 300 },
      { title: "마사지 단계 2", description: "엄지손가락으로 근육의 중앙을 따라 원을 그리며 압력을 가합니다. 통증이 느껴지는 부분은 더 부드럽게 마사지하세요.", duration: 180 },
      { title: "스트레칭", description: "팔을 곧게 펴고 손바닥을 위로 향하게 한 후, 반대쪽 손으로 손가락을 뒤로 당깁니다. 15초씩 3회 반복합니다.", duration: 45 }
    ]
  },
  triceps: {
    title: "삼두박근 마사지 가이드",
    description: "삼두박근은 팔 뒤쪽에 위치한 큰 근육으로, 팔꿈치를 펴는 역할을 합니다.",
    steps: [
      { title: "준비 단계", description: "편안하게 앉아 팔을 이완시킵니다. 호흡을 깊게 하며 몸의 긴장을 풀어줍니다.", duration: 30 },
      { title: "마사지 단계 1", description: "반대쪽 손으로 삼두박근의 위쪽부터 아래쪽으로 부드럽게 문지릅니다. 근육 섬유 방향을 따라 마사지하세요.", duration: 240 },
      { title: "마사지 단계 2", description: "엄지와 검지로 근육을 부드럽게 집어 압력을 가합니다. 근육의 길이를 따라 점진적으로 진행하세요.", duration: 180 },
      { title: "스트레칭", description: "한쪽 팔을 머리 위로 올리고 팔꿈치를 구부려 등 뒤로 내립니다. 반대쪽 손으로 팔꿈치를 부드럽게 당깁니다.", duration: 45 }
    ]
  },
  brachialis: {
    title: "상완근 마사지 가이드",
    description: "상완근은 팔꿈치 굴곡을 돕는 깊은 근육으로, 이두박근 아래에 위치합니다.",
    steps: [
      { title: "준비 단계", description: "편안한 자세로 앉아 팔을 이완시킵니다. 깊게 호흡하여 근육 긴장을 풉니다.", duration: 30 },
      { title: "마사지 단계", description: "이두박근 아래쪽 부분을 엄지로 원을 그리며 부드럽게 마사지합니다. 팔꿈치 방향으로 점진적으로 진행하세요.", duration: 240 },
      { title: "스트레칭", description: "팔을 등 뒤로 펴고 반대쪽 손으로 손목을 잡아 부드럽게 당깁니다. 20초간 유지하고 3회 반복합니다.", duration: 60 }
    ]
  },
  flexorCarpi: {
    title: "수근굴근 마사지 가이드",
    description: "수근굴근은 손목 굴곡과 외전을 담당하는 근육으로, 전완 안쪽에 위치합니다.",
    steps: [
      { title: "준비 단계", description: "편안한 자세로 앉아 팔을 테이블 위에 올려놓습니다. 손바닥이 위를 향하게 합니다.", duration: 30 },
      { title: "마사지 단계", description: "반대쪽 손 엄지로 전완 안쪽을 손목에서 팔꿈치 방향으로 부드럽게 마사지합니다. 통증이 느껴지는 부분은 조금 더 집중적으로 마사지하세요.", duration: 240 },
      { title: "손목 스트레칭", description: "팔을 앞으로 뻗고 손바닥이 앞을 향하게 한 후, 반대쪽 손으로 손가락을 뒤로 부드럽게 당깁니다. 15초간 유지하고 3회 반복합니다.", duration: 45 }
    ]
  },
  neck: {
    title: '목 마사지 가이드',
    description: '목 근육의 긴장을 풀어주는 마사지 가이드입니다.',
    steps: [
      {
        title: '목 스트레칭',
        description: '천천히 목을 좌우로 돌려 근육을 풀어줍니다.',
        duration: 30
      },
      {
        title: '승모근 마사지',
        description: '어깨와 목이 만나는 부위를 부드럽게 주무릅니다.',
        duration: 60
      },
      {
        title: '후두부 마사지',
        description: '목 뒷부분을 손가락으로 가볍게 누르며 마사지합니다.',
        duration: 45
      },
      {
        title: '측면 마사지',
        description: '목 양옆을 엄지손가락으로 부드럽게 문질러줍니다.',
        duration: 45
      },
      {
        title: '마무리 스트레칭',
        description: '목을 앞뒤로 천천히 움직여 스트레칭을 마무리합니다.',
        duration: 30
      }
    ]
  }
}; 