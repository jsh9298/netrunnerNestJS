export class Stack<T> {
    private items: T[] = [];

    // 스택에 항목 추가
    push(item: T): void {
        this.items.push(item);
    }

    // 스택에서 항목 제거 및 반환
    pop(): T | undefined {
        return this.items.pop();
    }

    // 스택의 맨 위 항목을 반환 (제거하지 않음)
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    // 스택이 비어있는지 확인
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // 스택의 크기 반환
    size(): number {
        return this.items.length;
    }

    // 스택의 모든 항목 반환
    clear(): void {
        this.items = [];
    }

    // 스택의 모든 항목을 반환 (복사본)
    getItems(): T[] {
        return [...this.items];
    }
}
