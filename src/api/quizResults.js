function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

var quizResults = [
    {
        type: "초보 집콕러",
        desc: "집에 있으면 있지만 심심하면 집 밖을 나가고 싶어하는 초보집콕러~ \n 아직은 집이랑 서먹서먹한 42~ \n 이틀이상 집에 있으면 나가고 싶어서 안달난 마치 라푼젤같은 그대! \n 집에 있다가도 나오라면 바로 나오는 오케이맨~!",
        query: "chqhwlqzhrfj",
        score_range:range(26),
    },
    {
        type: "선택형 집콕러",
        desc: "주말엔 집에서 쉬는게 최고지만~~ 날 만나고 싶다면 ~ 나가줘야지~~~~ 뭐할건데? \n 꼭 재밌는 일이 있으면 무조건 튀어나가는 그대는 바로 선택형 집콕러! \n 당신은 집에 있는 걸 좋아하지만 선택장애의 면모가 리를 빗 있기때문에 친구들의 설득과 흥미 딘딘한 일이 있으면 바로 집에서 튀어나가버리곤 하지~~",
        query: "tjsxorgudwlqzhrfj",
        score_range:range(26, 51),
    },
    {
        type: "돌연변이 집콕러",
        desc: "극과극인 정말 집콕하고 싶을때 집에서 절대 나오지 않z...! \n 하지만 어느순간 또 약속 줄줄 잡아 버리는 그대! \n 성수기와 비성수기가 확실한 당신은 바로 돌연변이 집콕러! \n 집에서도 밖에서도 최선을 다해 노는 당신! \n 한번 놀고 나면 꼭 충분한 휴식이 필요하지~",
        query: "ehfdusqusdlwlqzhrfj",
        score_range:range(51, 75),
    },
    {
        type: "프로 집콕러",
        desc: "집이 곧 나의 삶의 전부일세, 당신은 바로 프로 집콕러~ 집을 왜 나가~~ 집밖은 위험해~ \n 주변에 아무리 불러도 순순히 나가지 않지!! 마치 나는 신비주의~!! \n 하지만 그냥 나가기 귀찮은 사람 ^^ \n 개인적인 시간은 필수! 집에서 나가는 것 조차 큰 결심이 필요해요~ \n 집에 놀거리 가득하면 집 밖에 더더욱 안나갈 자신이 있어~~~~~",
        query: "vmfhwlqzhrfj",
        score_range:range(76, 101),
    },
]

export default quizResults;