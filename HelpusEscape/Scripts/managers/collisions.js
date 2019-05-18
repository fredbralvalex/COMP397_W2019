var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.CheckDistance = function (obj1, obj2) {
            // Create 2 temporary Vec2 objects used for collision detections
            var p1 = new math.Vec2(obj1.x, obj1.y);
            var p2 = new math.Vec2(obj2.x, obj2.y);
            if (math.Vec2.Distance(p1, p2) < (obj1.halfH / 2 + obj2.halfH / 2)) {
                if (!obj2.isColliding) {
                    // console.log("Colliding with " + obj2.name);
                    switch (obj2.name) {
                        case "enemy":
                            break;
                    }
                    obj2.isColliding = true;
                }
                return true;
            }
            else {
                obj2.isColliding = false;
                return false;
            }
        };
        Collision.CheckDistanceDoubled = function (obj1, obj2) {
            // Create 2 temporary Vec2 objects used for collision detections
            var p1 = new math.Vec2(obj1.x, obj1.y);
            var p2 = new math.Vec2(obj2.x, obj2.y);
            if (math.Vec2.Distance(p1, p2) < (obj1.boxCollider.width + obj2.boxCollider.width)) {
                if (!obj2.isColliding) {
                    // console.log("Colliding with " + obj2.name);
                    switch (obj2.name) {
                        case "enemy":
                            break;
                    }
                    obj2.isColliding = true;
                }
                return true;
            }
            else {
                obj2.isColliding = false;
                return false;
            }
        };
        Collision.GetDistance = function (obj1, obj2) {
            var p1 = new math.Vec2(obj1.x, obj1.y);
            var p2 = new math.Vec2(obj2.x, obj2.y);
            return math.Vec2.Distance(p1, p2);
        };
        Collision.CheckAABB = function (obj1, obj2) {
            var aabb1 = obj1.boxCollider.aabb;
            var aabb2 = obj2.boxCollider.aabb;
            var md = aabb1.minkowskiDifference(aabb2);
            if (md.CheckCollided()) {
                if (!obj2.isColliding) {
                    obj2.isColliding = true;
                    var penetrationVector = md.closestPointOnBoundsToPoint(math.Vec2.zero);
                    obj1.OnColliderEnter(penetrationVector, obj2);
                }
                return true;
            }
            if (obj2.isColliding) {
                obj1.OnColliderExit(penetrationVector, obj2);
            }
            //boxA.center += penetrationVector;
            obj2.isColliding = false;
            return false;
        };
        Collision.CheckAABBCollision = function (aabb1, aabb2) {
            return aabb1.minkowskiDifference(aabb2);
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collisions.js.map