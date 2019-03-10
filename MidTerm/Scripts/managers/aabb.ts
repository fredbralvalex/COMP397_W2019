module managers{
    export class AABB
    {
        public center:math.Vec2 = new math.Vec2();
        public extents:math.Vec2 = new math.Vec2();
        public min:math.Vec2;
        public max:math.Vec2;
        public size:math.Vec2;
        public isCollided:boolean;


        constructor (center:math.Vec2, extents:math.Vec2) 
        {
            this.center = center;
            this.extents = extents;
            this.min = new math.Vec2(this.center.x - this.extents.x, this.center.y - this.extents.y);
            this.max = new math.Vec2(this.center.x + this.extents.x, this.center.y + this.extents.y);
            this.size = new math.Vec2(this.extents.x * 2, this.extents.y * 2);
        }

       public minkowskiDifference(other:AABB):AABB
       {
           var topLeft:math.Vec2 = math.Vec2.Difference(other.max, this.min);
           var fullSize:math.Vec2 = math.Vec2.Sum(this.size, other.size);
           return new AABB(math.Vec2.Sum(topLeft, math.Vec2.Divide(fullSize, 2)), math.Vec2.Divide(fullSize, 2));
       }      

        //work only if this object is the result of checking aabb collision using minkowskiDifference
        public CheckCollided():boolean {
            this.isCollided = this.min.x <= 0 &&
            this.max.x >= 0 &&
            this.min.y <= 0 &&
            this.max.y >= 0;
            return this.isCollided;
        }
    }
}