module.exports = {
    apps: [
        {
            name: 'main', // PM2에서 사용할 애플리케이션 이름
            script: 'dist/main.js', // 실행할 스크립트 파일 경로
            instances: 'max', // 클러스터 모드에서 생성할 인스턴스 수 ('max'는 가능한 모든 CPU 코어를 사용)
            exec_mode: 'cluster', // 실행 모드: 'fork' 또는 'cluster'
            merge_logs: true, // 클러스터에서 생성된 로그를 하나로 합침
            autorestart: true, // 프로세스가 실패할 경우 자동으로 재시작
            watch: false, // 파일 변화 감지 시 재시작 여부
            max_memory_restart: "512M", // 메모리 사용량이 설정값을 초과하면 프로세스 재시작
            max_old_space_size: "128M", // V8 엔진의 최대 Old Space 크기 설정
            env: {
                NODE_ENV: 'production' // 프로덕션 환경에서 실행
            },
            listen_port: 4000 // 애플리케이션이 수신할 포트 (PM2 설정에서 직접 사용하지 않음)
        }
    ]
};
