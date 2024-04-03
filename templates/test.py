t=int(input())
while t>=0:
    n=int(input())
    a=[]
    s=set()
    for i in range(0,n):
        b=int(input())
        a.append(b)
        s.add(b)
    print(len(s)-1)
    t-=1