def prime():
    c=0
    for i in range(2,25):
        if 25%i!=0:
            c=1
            continue
        else:
            c=0
            break
    if c==1:
        print('p')
        return True
    else:
        return False