import React from "react";
import { useDispatch } from "react-redux";
import { moveNextStage } from "redux/actions/SignQuizActions";

const QuizSelection = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div
        style={{
          backgroundColor: "gray",
          borderRadius: "20px",
          opacity: 0.8,
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
          padding: "30px",
          margin: "auto",
          width: "90%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          {"1번 문제 입니다."}
        </h1>
        <h1
          style={{
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          {"세 단어의 수어 동작을 모두 학습해주세요"}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "100px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            flexBasis: "30%",
            padding: "10px",
            backgroundColor: "#EBFFDB",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src=" https://www.korean.go.kr/asset/img/SJ/img_001_1.jpg"
            alt="Image 1"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
          <h2
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            {"ㄱ"}
          </h2>
        </div>
        <div
          style={{
            flexBasis: "30%",
            padding: "10px",
            backgroundColor: "#EBFFDB",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src=" https://www.korean.go.kr/asset/img/SJ/img_001_1.jpg"
            alt="Image 2"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
          <h2
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            {"ㄴ"}
          </h2>
        </div>
        <div
          style={{
            flexBasis: "30%",
            padding: "10px",
            backgroundColor: "#EBFFDB",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src=" data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVEhgVFBQUFhgYGRoYGRgWHBIYGRYZHhweGhgcGBgdIS4lHSEsJB0cJjgnKzAxOjU1GiQ+QDs0Py80NTEBDAwMDw8PGA8PGD8dJB0xMTExMTExNDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4AMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EAEcQAAICAQIEAwUFBAYFDQAAAAECAAMEERIFEyExBkFRFCJhcYEyQlJykSNiobEHFRZTgpIzNaLC0SQlQ0RVdIOTo6SzwdL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP2aIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgInIWqSVDDcOpGo1A+InSB9ifAZ9gInhmABJIAHUk9NB8Z8RwRqCCD2IIIP1gdIicq7VYaqwYdtQQevp0gdYiICIiAiIgIiICIiAiIgIiICIiBWcc4fZfVsryLcdtwbmVbd2g193r00Ov8ACZ/+x2X/ANr53/pf/mWnGvF2BiWCrJvWtyocKVsOqkkA6qpHcH9J+e+G/GOBXxDidj5QRL2q5LlbWDaK4YhQuo0LDvpA5f1vlW+F8m+y+x35yhbCSH2i6pRoRpp5/qZH41h4lNeBZjZlllr5GOLE9oNmisNz6oG6e8AP4TWeBTwp8McNrvrzdoaxwa7EDLzAwJVhp0LIO/lrM34c4vw5t7WcHZnqvZUbDxmdAF2lSWLdH11OnptgWJzsmnxHlnHxTklqaVcB1r2Jtr1bVgd3l0Es+P5PEuIczDxsWzFpLGu7JydASmu1xTWCd4I10YEgg9111kTw5xCrN4vnL7M9IfGVWawX15DKQikMpcqo9Cqg9jrKGzH4UmbkY1tGdpQUCvTZlWl9y6neq/Y8tPXrA03B7OI8KAxLMW3NxlbSi7G2mxVYnRLKyR21+1qAPU+UvHzLT4jeo2WcsYIcVlm2B+Yg12a7d2nnMXbVwo5ONRTRnnn2Ctmusy6dgOmhTd9o9T0+U0GXwzOw+Ki/EwmyalxExk1trTsQdS7akkBfTrrA2njL/V2X/wB2v/8AjafmuTl5C8O4JVTfbR7Q61O1Z2nazKuvx03EiaTinFOKW4mWMnh6Y1XsmR73Pqtbdy22janlM7dw/Kfh3Bbceh7zjulzKhVeilWA1PbXbprA3fBPDV9FwsfiOXkKARy7SpQ6jQE6eYmW/ob4lQtN9BtQWtl3MtZYb2UJX7wXuR7p6/Ay9w/EPFrLUVuEGtGdQ7tk0EopYB22aAtoNToO+kpf6G8Ck0ZFxqrNq5dyrYVXeq7E90NpqB7x6a+ZgfpsREBERAREQEREBERAREQEREBERA42Y9bHVkVj21IUn+M8+x1f3af5V/4SREDjXj1qdVRVPbUBQf4TE0f0b117uTxDiVId2crVcqLubudqp36Aa/ATeRAyvh3wdXh5FmQMjKvssQIzZDrYdAQR720HpoB1PaRs7wDW+TbkJm5+O95BsGPatYO0aL2XU6de5PczZzwzADUkAep6QMZj/wBHyC+m+zO4heaHDot9osUEaeRXprp100m2nAZVZ7Oh+TL/AMZ3gQuKYS30WUMSq2o1bEaagOpUkagjXrPHBOGJjY9eOjMy1qEUvpuIHroANfpLCICUXhbw5Vg1PXU7uLLWuJcqSGYKpA2gdPdH8ZexAREQEREBERAREQEREBERAREQEREBERASBxTidONXzLnCLqFHQsWY9FVFUEsx8gATHF+JJj0PdZrtQdl6szHoqqPNmYhQPUiVPBuD2PYMzNCnII/Z19GTDQ/crPm5196zuew0UaQOavxLK6jTAp8tyrZlOPUqfcp+R3n1AntPBOATuuR8l/x5L2XE+pCsdo1/dUTTRAoG8G8MPfBxPpVUP5CRv7JioE4V9+IfJQxuo+RosJUD8pX5iaiIGVbj2Ti6+30/sx/1vHDPUB1621dXr7dT7y9e4mjouR1DoysrAMGUhlYHqCCOhB9Z2mSxaxw7JWoDTDyXIrHQLi5DdeWB5V2HUqB0Daj7wga6IiAiIgIiICIiAiIgIiICIiAiIgIiICIiBmOJDn8SpoYa141ftTjyNrMUx9fy7bG+aqfKaeZvw+N+bn2666W1UD4LXSj6f5rn/WaSAicb7kRGd2VVQFmZiFVVA1JYnoAB11lRg+K8G6xa67gzNrs1WxVs06/s3ZQr9Ovuk9jAvYkfKyUrrayxgqIpZmPZVA1JP0lXwjxJRkNsUXVvt3Kl9dlLOnbegcDevUdu2o101EC8lX4h4b7Ri2Ug7WZdUb8Fi+9W4/KwU/SWkQKvw5xI5OLVcRozIN6/hsHu2L9GDD6S0ma8Mfs8jOx9TouQL1B06JkKHOnw5gtmlgIiICIiAiIgIiICIiAiIgIiICIiAiIgZvwou23iCnv7azfRqKGH85pJmAeRxUg9EzagQfL2ijUMPTVqmX4kUn0mngV/GOG15FJpsLbGZCwXT3wrq5RtQdVbbtI8wSJ94pwyq+sJYNQro6lToyujBkZWHVSCPLyJHnJ8rOMtlhFbFFTOraslpZRYmh1VXAOxtdCCQR00PeB24lgV31Gq1d6Nt3LqRuAYMAdO4JA1HYjUHoZ5y+G12WU2EEPQzMjDQH3kKMp9VIPUeqr6So/rfiFhCVYDUt9+zKekVoPPYKmdrD30+yPUzTQERON9qojOxCqqlmY9lUDUk/AAQKHhfXimafSrEX6/tm/kwmkmc8G1s1L5LghsuxsjQ91rICUKflWqaj1JmjgIiICIiAiIgIiICIiAiIgIiICIiAiIgU/iPhZyKNEbbajLbQ/4LV6oT+6eqsPNWYT34f4suTQH27HUlLaz9qm1ejo3yPY+YIPnLMnSYPiucPbBfwtHyL9dmSlfTGuQdP2t7EItq6aKy7m7qQR2DfRKPhfiPHvbl6tTePtY9w2Wj10U/bX95SQfWXkBETjfeiKWdlVR1JYgAD4kwO0ynGbPbL/Yq9TUjBsxx9nQaMuOD5s/TcB2TUH7QkbivHMzJRl4XXuUdGyWKqp6jVccONLG0++fdH73lK8McSw61XEUPjWrqTVk+7bYxJLOHPu3EnUllLd/LpA1AGnQT1EQEREBERAREQEREBERAREQEREBERASq4zxqrGVS+5nc7a6kG6y1tNdqL/MnQDzInPxBxkY6oqKbb7m2UVA6F301JJ+6igbmbyHzAPLgfAuUzZF787KsGj2kdEXvyqF+5WD5dyep1MCEvBsjM0biBCV9GXCrbVAR1HtFg/0x/dGidOzd5pq6lVQqgKAAAAAAAOwAHYTrECFxHhtGQhrvqS1T911UjX1GvY/ESIlWNw/EcqpSmpXsYAu5AA3HTcSfkJcTJeKstb2GDWN7F6nySAClGOHV25rHoCyqQE7kE9NOsC24Bxf2mt2Nb1OjmuytypZGAVtNykggqynUfinL+y+EbmvehbLGbdvuL2lTrqNgsJCAHsFA08pQ8C8R4yWZbsLyt2TzK2THzXVkFNVYYMtZH2kYfSXeN4qxXdKybq2dtic6jKpVmIJCh3QLuOh0Gup8oF/IudhVXIa7kWxG7q4BB+hkqIGSbEyeH+9RzMnEA97HYl7sdR96h2O6xQP+jYk/hPlNBw3iFV9a20uHRuzL+hBHcEHoQeoI6ybMlxEewZPtKjTGyGC5QHRabD0TI9AD0Vz+VvIwNbERAREQEREBERAREQEREBERATwzAAknQDqdfIT3M942ub2N60JD3vXjKR3HOcIxHxCsx+kDh4Wr57vxBx1t1TGB+5ig+4QPIuQXPwKjymonDGoWtFRAFVVCqo7BQNFA+gneAiQ8TOrtNgQ6mqw1v0I2uFViOo69GXqPWTIFB4j4nYmzHxtPaLyQhI3ClB/pL3XzCgjQHuzKPWdcDhCYuM1dDBGIZ2vsG9ntI1a27qN516nqOg0GgA0k4vC0S+3I6my3YCx67UVQFRPRddzfEufhpNdQQQQCCNCD1BB7giBgsjjYB2tx2gtrptxqKLHJHcKgNh+mhlVxXIstOOntHEbS2TQFbJorxsUurhgGHLR2JCnQLr1A1l5xK3IxtOdnYmKGO1K8TG3XWanRQis7lm7dkI+UhcG4eV4jj5GU11bsLK8dMl+dkXsV3uzqv7PHVVXoq+bHU9hA/R4icMi9EG52VRqq6sQBuZgqjU+ZJAA8yRA7zhk0JYjVuoZHUoynqGVhowPwIM7xAznhC5lrsxLGLWYj8rcx1Z6SN2O5+aEKT+JGmjmbyV5fFqXHbIx7Km/PUwsr/2Wt/SaSAiIgIiICIiB81jWcN8b4HfWNZw3xvgd9Y1nDfG+B31md8RHdl8Pr8ufZYf/AA6LNP8AadZd75neKP8A86YI8hVln66Uj/7MDU6xrOG+fQ8Cg8GdRmOfvZ+Tp/gK1/7k0usyfhPMrrwOda6Vq9uTYzOyqo35FjDVj8CJ1Hi6qw6YtGTl+W+lAtX/AJ1pVCPykwNPrMZ4iysit9Ls3lI7MKcfCq3ZV4HYBnLHXTuVUAfiEkW8U4o5CV4VdAYH9rffW4r7dTVWCXOhOgDadOpEmcK4DXVvZ2a+6xdtl9um91P3V00CJ6IugHxPWBkeFYti5goSihGsBOUv7XIyK6HRgGyM1n6WMdAtag+Z10Gsq8PKa27CZ2YvgNi476k6i2zIsxbd3XuVqU9fJpY4Wdbw21kWhkqssLGvIZNXY9CcfO3bXYgAhLtrdNA3lOGXwu25MmzhpTm3ZVd2Rj5C8u6hlZLE3atoNrq7HyZbDtJIGofq+sznjof8jDeSX4rt+VcissfoNT9JZ8NpaulK2sa1lUKzt1Z2A95j8zIviegW4OTWfv0WqPgdjaH6HQwLrWNZV8Fzudi0W/3lVb/5kDH+cm74FH4rBFmDYPuZiKfy2V2VfzdZo9ZmPG7aYqP5pk4jj6ZFY6fqZoS8DtrGs4b43wO+sazhvjfA76xrOG+N8DhvjfIfOjnQiZvjfIfOjnSiZvjfIfOjnQJm+UHFP9Z4TfuZafqtbf7ss+dKLxLdy2xsjrpReN/5LVahifgC6t/hkVqd8p+Je3PZspavHq0G686WWsT3Wusjaun4nJ/LJnNjnQip4X4Pw6QpZGyGQaI2Qxt2ddTy0PupqevuqJot8h86V/FuO1YwG9izPrsqTQ2WEdwi+g82OgHmRAvN8hcYx67aHSyprU2ltiHRmK+8oQ6ro+oGh1Gh06ifmOVxNb29ouJNrLspdLrceihSddlboeZkvrpqVUqSoA07y/4C2U9e2vijO6AB0yKK2ZfQ7Ny2KD21ZiTpCvWLkO6NVj5K5a6aPg8RGy8L+HeVDjp5ujg+vnK/gmPkf1i5wt9Aro5dteaj2LQ29XrrSxHBcFSWXVmCrrp0YAWvEuCZmQAt92E23qrnGs3qfVG52qn4giWPhzhCYdbqHexncu7udWY6BQOupCgAAAk/OB0N3F0+5gXDz2tk0H5AEOPrrOeT4gtRGXKwcitSpUvVsyawCNNTy/fA69ynlLTHzUdd6MrqdQGQhlJBKnQjp0II+YnTnQKjwDxKq3h2OqWIzV01o6qwLIyqF0Ze69vOaPfK9AgYuFUMwAZgAGYDXaC3cganT5mdOdCKzxs2uIF/FkYi/wDua5fl5lvEVu+3EoGh35AtYH8FCmwnT83LH1l7zoVM3xvkPnRzpUTN8b5D50c6BM3xvkPnRzoFeLY5srxbHNgWHNjmyv5sc2BYc2ObK/mxzYFhzZyykSyt63AZHUoynzUjQyJzY5sCvw+MezaUZjhQvSrIfolyAdA7notgA0IOmumo79JFnivCB0W9LGPZKN1zH/DWGM7tYCNDoR6GfEcL0UAfIAfygRTn5t3SqpcZP7zI2u5H7lKNoP8AG30kLjnCkrwcoqXstes77WJaxwOrKPJV010VQFGvaXPNjmwMNw3h7XDeuxkbobXdlpO3oQW6W5Gh1G3VK/QaS64TnYdDaVWWZVoXZsxkJrAJBKolelSdh1Y6+rd5NPA8IuXONQXY7izIh1JOpOhGmuvnLFHAGgAAHYDoB8hCo39YZ9n2MeqgfjyHDt8xVV0/VxOdnABcD7ZfbkajTYpamkfKtCCfmzN9JO5sc2EV9WLk4ihcYi+lQAMexgr1j0qtPQj91v8AMJJx/E+MzBHZqHP3MgGtvkpb3X/wkzvzZ5u2OpV1V1PdWAYH5g9IFkt2vUHX5TzdlKil3YKqglmYgBQOpJJ7CZo+HsLUlaEQnzrL1/psI0n1eBYmoLIz6EEC2y+1QR2IV3I1+kCVwRzfa+YwIV15eODqCKQdxcg9i7e9+VUl5zZX82fDfAsebHNlb7SJ89qHrAs+bHNlb7SI9pHrAsubHNlYMn4z0LoEMPPu6RVs6T7zJRJ3RukbmRzIEndG6RuZHMgSd0bpG5kcyBJ3RukbmRzIEndG6RuZHMgSd0bpG5kcyBJ3RukbmRzIEndG6RuZHMgSd0bpG5kcyBI3z3iANYoYEjqSoIG7Qa6akgDt3J6SJvhbCCCrFSOxBII+RECzbGqHQknSvUsGrVerkBi+7aOwTuer9uklWYNW1jsZfet6kPooVH0+YGin4nz6ESiOVZu38x92mm7c27T01110nME67tTqddTqdTr0Op+Op/WQXd2NVyiwCa6qvuM7DXdWr9Sx00YsB6gg/Pq/D6VRnCM6hm6ftCQqsAwIU9CNGGp6diZnwx0K6nQ9xqdD27j6D9J52CBo/wCrqlbbtZ21CaDeQHALMzBTrtAZB07d5UhtCR06Ejp1H0MhhROgaBKEREBERAREQEREBERAREQEREBERAREQEREBBnyICIiAiIgJ9iIH//Z"
            alt="Image 3"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
          <h2
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            {"ㄷ"}
          </h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <button
          style={{
            width: "11rem",
            height: "3rem",
            borderRadius: "1.5rem",
            background: "#fad795",
            fontSize: "1.5rem",
            fontWeight: 900,
            border: "1.8px solid black",
          }}
          onClick={() => {
            dispatch(moveNextStage());
          }}
        >
          {"문제 풀기"}
        </button>
      </div>
    </div>
  );
};

export default QuizSelection;

// 개선사항 1. 각 이미지를 클릭했을때 상세 정보가 표현되면 좋을 듯
