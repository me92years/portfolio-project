# portfolio-project
OAuth2를 활용한 간단한 미니 프로젝트.

[프론트엔드]
TypeScript
Vite

[백엔드]
SpringBoot
Spring Security
JWT
OAuth2
JenKins
Nginx

[DB]
MariaDB

[형상 관리]
Git

[Https]
certbot

[IDE]
Eclipse, VSCode, HeidiSQL

========================================

[도메인]
1. User
2. Post
3. Comment

[ERD]
너무 많아서 생략..

========================================

Security를 사용하여 보안을 유지합니다.
JWT토큰을 사용하여 인증을 유지합니다.
QueryDSL 라이브러리를 활용했습니다.

========================================

[문제점]

1. JWT토큰은 두 가지를 생성합니다.
   이 때, Access 토큰은 redirect uri로 보냈어야 하는데, Refresh Token과 마찬가지로 쿠키로 보낸 것.
   사용에는 지장이 없지만, 많이 사용하는 방식이 아닌 것 같아 아쉬움.   
  
2. 환경 구축 시의 어려움
   Gradle의 설정을 통해 실제 운영 환경과 개발 환경의 분리를 보다 확실하게 하고 싶었으나 아직은 지식이 부족.

3. QueryDSL의 사용법이 미숙
   높은 러닝커브로 인해 사실상 깊은 수준의 활용을 하지 못하고 있음.

4. 대규모 트래픽, 트래픽 모니터링과 분산은 어떻게 해야 하는가?
   아직 트래픽 관리에 대한 지식이 부족함. 더 공부가 필요함.
   
