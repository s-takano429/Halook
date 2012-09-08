var groupRectangle = function(objectProperty, raphael) {
    // パラメータチェック log吐き出し
    if (objectProperty) {
        if (common.log.isDebugEnabled) {
            var logMessage = "<groupRectangle>：objectProperty=" + objectProperty;
            common.log.debug(logMessage);
        }
    }
    if (raphael) {
        if (common.log.isDebugEnabled) {
            var logMessage = "<groupRectangle>：raphael=" + raphael;
            common.log.debug(logMessage);
        }
    }

    // 設定が取得できない場合は処理を終了する。
    if (!objectProperty) {
        return this;
    }

    // intに直す。
    objectProperty.pointX = parseInt(objectProperty.pointX);
    objectProperty.pointY = parseInt(objectProperty.pointY);
    objectProperty.width = parseInt(objectProperty.width);
    objectProperty.height = parseInt(objectProperty.height);

    // ポジションのリスト
    var positionArray = new Array();
    // 左上ポジション
    var firstPosition = new Position(objectProperty.pointX, objectProperty.pointY);
    positionArray.push(firstPosition);
    // 右上ポジション
    var secondPosition = new Position(objectProperty.width, 0);
    positionArray.push(secondPosition);
    // 左下ポジション
    var thirdPosition = new Position(0, objectProperty.height);
    positionArray.push(thirdPosition);
    // 右下ポジション
    var forthPosition = new Position(-1 * objectProperty.width, 0);
    positionArray.push(forthPosition);
    this.createObject(positionArray, raphael);
    this.groupChildObjectList_ = {};
    if (!objectProperty.color) {
        objectProperty.color = "#FFFFFF";
    }
    if (!objectProperty.lineType) {
        objectProperty.lineType = "";
    }
    // 透明のオブジェクトとして扱う。
    objectProperty.opacity = 0;
    this.setProperty(objectProperty);

    if (objectProperty.objectId) {
        this.object.node.setAttribute(constants.OBJECT_ID, objectProperty.objectId);
        this.objectId = objectProperty.objectId;
    }
    this.objectType_ = constants.GROUP_RECT_TYPE;
    this.setScaleSize();
    // スケールの変更に伴い、四角が大きくなるため、補正をかける。
    var path = this.createPathString(positionArray);
    this.object.attr("path", path);
};

groupRectangle.prototype = new rectangle();

groupRectangle.prototype.setProperty = function(propertiesInfo) {
    var raphaelObject = this.object;
    var positionArray = new Array();
    var firstPosition = new Position(propertiesInfo.pointX, propertiesInfo.pointY);
    positionArray.push(firstPosition);
    var secondPosition = new Position(propertiesInfo.width, 0);
    positionArray.push(secondPosition);
    var thirdPosition = new Position(0, propertiesInfo.height);
    positionArray.push(thirdPosition);
    var forthPosition = new Position(-1 * propertiesInfo.width, 0);
    positionArray.push(forthPosition);
    var path = this.createPathString(positionArray);
    raphaelObject.attr('path', path);
    raphaelObject.attr("fill", propertiesInfo.color);
    raphaelObject.attr('opacity', propertiesInfo.opacity);
    this.refactorConnectLine();
};

groupRectangle.prototype.addChildObject = function(object) {
    // パラメータチェック log吐き出し
    if (object) {
        if (common.log.isDebugEnabled) {
            var logMessage = "<addChildObject> : ";
            $.each(object, function(index, target) {
                logMessage = logMessage + '[ objectId=' + target.objectId + ',';
                logMessage + logMessage + 'objectType' + target.objectType_ + ']';
            });
            common.log.debug(logMessage);
        }
    }
    var instance = this;
    $.each(object, function(index, target) {
        instance.groupChildObjectList_[target.objectId] = target;
    });
};

groupRectangle.prototype.getChildObject = function() {
    if (common.log.isDebugEnabled) {
        var message = '<Get Group ChildList> : ';
        if (!this.groupChildObjectList_) {
            message = message + 'no group object';
            common.log.debug(message);
        } else {
            $.each(this.groupChildObjectList_, function(index, object) {
                message = message + object.toString;
                message = message + ', ';
            });
            common.log.debug(message);
        }
    }
    return this.groupChildObjectList_;
};

groupRectangle.prototype.getFrontChildObject = function() {
    var frontObject = null;
    var isStateObject = false;
    $.each(this.groupChildObjectList_, function(index, object) {
        if (object.objectType_ == constants.STATE_OBJECT_TYPE_NAME) {
            isStateObject = true;
            return false;
        }
    });

    $.each(this.groupChildObjectList_, function(index, object) {
        if (isStateObject) {

            if (object.objectType_ != constants.STATE_OBJECT_TYPE_NAME) {
                return true;
            }
        }

        if (frontObject) {
            var targetZIndex = object.getZIndex();
            var maxZIndex = frontObject.getZIndex();
            if (targetZIndex > maxZIndex) {
                frontObject = object;
            }
        } else {
            frontObject = object;
        }
    });
    return frontObject;
};

groupRectangle.prototype.toString = function() {
    var toStringObject = this.object;
    if (!toStringObject.attrs) {
        return "groupRectangle is null";
    }
    var property = "groupRectangle [";

    if (toStringObject.attrs.pointX) {
        property = property + "pointX=" + toStringObject.attrs.pointX + ", ";
    }
    if (toStringObject.attrs.pointY) {
        property = property + "pointY=" + toStringObject.attrs.pointY + ", ";
    }
    if (toStringObject.attrs.height) {
        property = property + "height=" + toStringObject.attrs.height + ", ";
    }
    if (toStringObject.attrs.width) {
        property = property + "width=" + toStringObject.attrs.width + ", ";
    }
    if (this.objectId) {
        property = property + "objectId=" + this.objectId + ", ";
    }
    if (this.objectType_) {
        property = property + "objectType=" + this.objectType_ + ", ";
    }
    if (toStringObject.attrs.lineType) {
        property = property + "lineType=" + toStringObject.attrs.lineType + ", ";
    }
    if (toStringObject.attrs.path) {
        property = property + "path=" + toStringObject.attrs.path + ", ";
    }
    if (toStringObject.attrs.fill) {
        property = property + "fill=" + toStringObject.attrs.fill + ", ";
    }
    if (toStringObject.attrs.stroke) {
        property = property + "stroke=" + toStringObject.attrs.stroke + ", ";
    }
    if (toStringObject.attrs[constants.STROKE_DASHARRAY]) {
        property = property + "stroke-dasharray="
                + toStringObject.attrs[constants.STROKE_DASHARRAY] + ", ";
    }
    if (toStringObject.attrs[constants.STROKE_WIDTH]) {
        property = property + "stroke-width=" + toStringObject.attrs[constants.STROKE_WIDTH] + ", ";
    }
    if (toStringObject.attrs.opacity) {
        property = property + "opacity=" + toStringObject.attrs.opacity + ", ";
    }
    if (toStringObject.attrs.scale) {
        property = property + "scale=" + toStringObject.attrs.scale;
    }
    property = property + "]";
    return property;
};
