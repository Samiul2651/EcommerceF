import random

def clamp_mod(val, low, high):
    """Force value into [low, high] using modulo"""
    return (val - low) % (high - low + 1) + low

def write_case(filename, n, candies, q, queries):
    """Write test case file with forced modulo"""
    with open(filename, "w") as f:
        f.write(str(n) + "\n")
        # Force all candies into [1,10000]
        candies = [str(clamp_mod(int(v), 1, 10000)) for v in candies]
        moddedCandies = []
        for v in candies:
            if int(v) < 1 or int(v) > 10000:
                mcandy = v % 10000
                if mcandy == 0: mcandy = 10000
            moddedCandies.append(v)
        f.write(" ".join(moddedCandies) + "\n")
        # f.write("\n")
        f.write(str(q) + "\n")
        # Force all queries into [1,n]
        queries = [str(clamp_mod(int(v), 1, n)) for v in queries]
        f.write(" ".join(queries) + "\n")

def generate_testcase(n, q, ai_range=(1, 10000), filename="test.txt"):
    candies = [random.randint(ai_range[0], ai_range[1]) for _ in range(n)]
    queries = [random.randint(1, n) for _ in range(q)]
    write_case(filename, n, candies, q, queries)

def generate_scattered_max_case(filename="test10.txt"):
    """Scattered max case with random clusters and forced modulo"""
    N = 10**6
    Q = 10**6
    clusters = 1000
    cluster_size = N // clusters
    candies = []

    for _ in range(clusters):
        base = random.randint(1, 10000)
        spread = random.randint(0, 200)
        for _ in range(cluster_size):
            val = base + random.randint(0, spread)
            candies.append(val)

    random.shuffle(candies)
    queries = [random.randint(1, N) for _ in range(Q)]
    write_case(filename, N, candies, Q, queries)

def main():
    # Small cases
    generate_testcase(6, 3, (1, 30), "test1.txt")
    generate_testcase(10, 5, (1, 50), "test2.txt")
    generate_testcase(15, 7, (1, 100), "test3.txt")

    # Large cases
    N, Q = 10**6, 10**6

    # 4. completely random
    generate_testcase(N, Q, (1, 10000), "test4.txt")

    # 5. all same
    candies = [5000] * N
    queries = [random.randint(1, N) for _ in range(Q)]
    write_case("test5.txt", N, candies, Q, queries)

    # 6. increasing pattern
    candies = [(i % 10000) + 1 for i in range(N)]
    queries = [random.randint(1, N) for _ in range(Q)]
    write_case("test6.txt", N, candies, Q, queries)

    # 7. decreasing pattern
    candies = [10000 - (i % 10000) for i in range(N)]
    queries = [random.randint(1, N) for _ in range(Q)]
    write_case("test7.txt", N, candies, Q, queries)

    # 8. half low, half high
    candies = [1 if i < N//2 else 10000 for i in range(N)]
    queries = [random.randint(1, N) for _ in range(Q)]
    write_case("test8.txt", N, candies, Q, queries)

    # 9. alternating low/high
    candies = [1 if i % 2 == 0 else 10000 for i in range(N)]
    queries = [random.randint(1, N) for _ in range(Q)]
    write_case("test9.txt", N, candies, Q, queries)

    # 10. scattered random clusters
    generate_scattered_max_case("test10.txt")

if __name__ == "__main__":
    main()
